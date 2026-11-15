
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import { randomUUID } from 'crypto';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const OWNER_EMAIL = (process.env.OWNER_EMAIL || '').trim().toLowerCase();
const OWNER_PASSWORD = process.env.OWNER_PASSWORD || '';

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is missing from your environment variables.');
}

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be set to a secret of at least 32 characters.');
}

if (!OWNER_EMAIL || !OWNER_PASSWORD || OWNER_PASSWORD.length < 12) {
  throw new Error('Set OWNER_EMAIL and a strong OWNER_PASSWORD (at least 12 characters).');
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(express.json({ limit: '1mb' }));

const ORDER_STATUSES = [
  'Order Received',
  'In Tailoring & Alteration',
  'Quality Check & Packed',
  'Ready at Tex Valley / Dispatched',
  'Completed',
  'Cancelled',
] as const;

type OrderStatus = typeof ORDER_STATUSES[number];
type UserRole = 'customer' | 'seller';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

interface AuthRequest extends Request {
  authUser?: AuthUser;
}

function safeUser(row: any): AuthUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    role: row.role,
  };
}

function createToken(user: AuthUser): string {
  return jwt.sign(
    { sub: user.id, role: user.role },
    JWT_SECRET!,
    { expiresIn: '7d' }
  );
}

function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Please log in to continue.' });
  }

  const token = header.slice(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as jwt.JwtPayload;

    if (!decoded.sub) {
      return res.status(401).json({ error: 'Invalid authentication token.' });
    }

    (req as AuthRequest).authUser = {
      id: String(decoded.sub),
      name: '',
      email: '',
      phone: '',
      role: decoded.role === 'seller' ? 'seller' : 'customer',
    };

    next();
  } catch {
    return res.status(401).json({
      error: 'Your session has expired. Please log in again.',
    });
  }
}

function requireSeller(req: Request, res: Response, next: NextFunction) {
  if ((req as AuthRequest).authUser?.role !== 'seller') {
    return res.status(403).json({
      error: 'Only the authorized shop owner can perform this action.',
    });
  }

  next();
}

async function getOrderById(id: string) {
  const result = await pool.query(
    `SELECT * FROM orders WHERE id = $1`,
    [id]
  );

  return result.rows[0] ? formatOrder(result.rows[0]) : null;
}

function formatOrder(row: any) {
  return {
    id: row.id,
    userId: row.user_id,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    customerEmail: row.customer_email,
    deliveryType: row.delivery_type,
    address: row.address,
    city: row.city,
    pincode: row.pincode,
    paymentMethod: row.payment_method,
    items: row.items,
    subtotal: Number(row.subtotal),
    discountAmount: Number(row.discount_amount),
    shippingFee: Number(row.shipping_fee),
    total: Number(row.total),
    couponCode: row.coupon_code,
    status: row.status,
    assignedTailor: row.assigned_tailor || '',
    tailorNotes: row.tailor_notes || '',
    estimatedReadyTime: row.estimated_ready_time || '',
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

// Create the owner account securely from environment variables.
// This replaces the old hardcoded owner password.
async function initializeOwner() {
  const passwordHash = await bcrypt.hash(OWNER_PASSWORD, 12);

  await pool.query(
    `INSERT INTO users
      (id, name, email, phone, password_hash, role)
     VALUES ($1, $2, $3, $4, $5, 'seller')
     ON CONFLICT (email)
     DO UPDATE SET
       name = EXCLUDED.name,
       password_hash = EXCLUDED.password_hash,
       role = 'seller'`,
    [
      randomUUID(),
      'EROMEN Store Owner',
      OWNER_EMAIL,
      '+91 98427 54321',
      passwordHash,
    ]
  );

  console.log('EROMEN owner account initialized.');
}

// Health check
app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');

    res.json({
      status: 'ok',
      store: 'EROMEN Tex Valley',
      database: 'connected',
    });
  } catch (error) {
    console.error('Health check database error:', error);
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
    });
  }
});

// Customer and owner login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, portalRole } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required.',
      });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    const result = await pool.query(
      `SELECT id, name, email, phone, password_hash, role
       FROM users WHERE email = $1`,
      [cleanEmail]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password.',
      });
    }

    const passwordMatches = await bcrypt.compare(
      String(password),
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        error: 'Invalid email or password.',
      });
    }

    if (portalRole === 'seller' && user.role !== 'seller') {
      return res.status(401).json({
        error: 'Access denied. Only the authorized owner can access this panel.',
      });
    }

    if (portalRole === 'customer' && user.role === 'seller') {
      return res.status(403).json({
        error: 'Please use the Owner / Seller Panel to sign in.',
      });
    }

    const publicUser = safeUser(user);
    const token = createToken(publicUser);

    return res.json({
      user: publicUser,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      error: 'Unable to log in. Please try again.',
    });
  }
});

// Customer registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body || {};

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        error: 'Name, email, phone, and password are required.',
      });
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters.',
      });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    if (cleanEmail === OWNER_EMAIL) {
      return res.status(403).json({
        error: 'This email is reserved for the store owner.',
      });
    }

    const passwordHash = await bcrypt.hash(String(password), 12);

    const result = await pool.query(
      `INSERT INTO users
        (id, name, email, phone, password_hash, role)
       VALUES ($1, $2, $3, $4, $5, 'customer')
       RETURNING id, name, email, phone, role`,
      [
        randomUUID(),
        String(name).trim(),
        cleanEmail,
        String(phone).trim(),
        passwordHash,
      ]
    );

    const publicUser = safeUser(result.rows[0]);
    const token = createToken(publicUser);

    return res.status(201).json({
      user: publicUser,
      token,
    });
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(409).json({
        error: 'An account with this email already exists. Please sign in.',
      });
    }

    console.error('Registration error:', error);
    return res.status(500).json({
      error: 'Unable to create your account. Please try again.',
    });
  }
});

// List orders: owner gets all; customer gets only their own.
app.get('/api/orders', authenticate, async (req, res) => {
  try {
    const user = (req as AuthRequest).authUser!;

    const result = user.role === 'seller'
      ? await pool.query(
          `SELECT * FROM orders ORDER BY created_at DESC`
        )
      : await pool.query(
          `SELECT * FROM orders
           WHERE user_id = $1
           ORDER BY created_at DESC`,
          [user.id]
        );

    return res.json({
      orders: result.rows.map(formatOrder),
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return res.status(500).json({
      error: 'Unable to load orders.',
    });
  }
});

// Place an order
app.post('/api/orders', authenticate, async (req, res) => {
  try {
    const user = (req as AuthRequest).authUser!;
    const body = req.body || {};

    if (
      !body.customerName ||
      !body.customerPhone ||
      !Array.isArray(body.items) ||
      body.items.length === 0
    ) {
      return res.status(400).json({
        error: 'Invalid order details or empty cart.',
      });
    }

    if (!['delivery', 'pickup'].includes(body.deliveryType)) {
      return res.status(400).json({
        error: 'Invalid delivery type.',
      });
    }

    if (!['cod', 'upi', 'store'].includes(body.paymentMethod)) {
      return res.status(400).json({
        error: 'Invalid payment method.',
      });
    }

    const now = new Date();
    const orderId = `ERO-${now.getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`;

    const subtotal = Number(body.subtotal);
    const discountAmount = Number(body.discountAmount);
    const shippingFee = Number(body.shippingFee);
    const total = Number(body.total);

    if (
      ![subtotal, discountAmount, shippingFee, total].every(
        value => Number.isFinite(value) && value >= 0
      )
    ) {
      return res.status(400).json({
        error: 'Invalid order amounts.',
      });
    }

    const result = await pool.query(
      `INSERT INTO orders (
        id, user_id, customer_name, customer_phone, customer_email,
        delivery_type, address, city, pincode, payment_method, items,
        subtotal, discount_amount, shipping_fee, total, coupon_code,
        status, assigned_tailor, tailor_notes, estimated_ready_time,
        created_at, updated_at
      )
      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10, $11,
        $12, $13, $14, $15, $16,
        $17, $18, $19, $20, $21, $21
      )
      RETURNING *`,
      [
        orderId,
        user.id,
        String(body.customerName),
        String(body.customerPhone),
        body.customerEmail ? String(body.customerEmail) : null,
        body.deliveryType,
        body.address ? String(body.address) : null,
        body.city ? String(body.city) : 'Perundurai',
        body.pincode ? String(body.pincode) : '638052',
        body.paymentMethod,
        JSON.stringify(body.items),
        subtotal,
        discountAmount,
        shippingFee,
        total,
        body.couponCode ? String(body.couponCode) : null,
        'Order Received',
        'Unassigned (Queue)',
        'Order received. Awaiting owner review & tailoring assignment.',
        body.deliveryType === 'pickup'
          ? 'Within 2 Hours'
          : '1-2 Business Days',
        now,
      ]
    );

    return res.status(201).json({
      order: formatOrder(result.rows[0]),
    });
  } catch (error) {
    console.error('Create order error:', error);
    return res.status(500).json({
      error: 'Unable to place your order. Please try again.',
    });
  }
});

// Owner updates order status and tailoring details
app.patch(
  '/api/orders/:id',
  authenticate,
  requireSeller,
  async (req, res) => {
    try {
      const { id } = req.params;
      const {
        status,
        assignedTailor,
        tailorNotes,
        estimatedReadyTime,
      } = req.body || {};

      if (status !== undefined && !ORDER_STATUSES.includes(status)) {
        return res.status(400).json({
          error: 'Invalid order status.',
        });
      }

      const existing = await getOrderById(id);

      if (!existing) {
        return res.status(404).json({
          error: 'Order not found.',
        });
      }

      const result = await pool.query(
        `UPDATE orders SET
          status = $1,
          assigned_tailor = $2,
          tailor_notes = $3,
          estimated_ready_time = $4,
          updated_at = NOW()
         WHERE id = $5
         RETURNING *`,
        [
          status ?? existing.status,
          assignedTailor !== undefined
            ? String(assignedTailor)
            : existing.assignedTailor,
          tailorNotes !== undefined
            ? String(tailorNotes)
            : existing.tailorNotes,
          estimatedReadyTime !== undefined
            ? String(estimatedReadyTime)
            : existing.estimatedReadyTime,
          id,
        ]
      );

      return res.json({
        order: formatOrder(result.rows[0]),
      });
    } catch (error) {
      console.error('Update order error:', error);
      return res.status(500).json({
        error: 'Unable to update the order.',
      });
    }
  }
);

// Development: Vite frontend middleware.
// Production: this service runs as an API backend on Render.
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
  console.log(`EROMEN server running on port ${PORT}`);
});
}

async function main() {
  await pool.query('SELECT 1');
  console.log('Neon PostgreSQL connected.');

  await initializeOwner();

  await startServer();
}

main().catch(error => {
  console.error('Failed to start EROMEN server:', error);
  process.exit(1);
});
