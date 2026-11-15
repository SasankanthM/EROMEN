import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

interface StoredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'customer' | 'seller';
  createdAt: string;
}

interface StoredOrderItem {
  productId: string;
  name: string;
  sku: string;
  image: string;
  selectedSize: string;
  selectedColorName: string;
  selectedColorHex: string;
  quantity: number;
  unitPrice: number;
}

interface StoredOrder {
  id: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryType: 'delivery' | 'pickup';
  address?: string;
  city?: string;
  pincode?: string;
  paymentMethod: 'cod' | 'upi' | 'store';
  items: StoredOrderItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  couponCode?: string;
  status:
    | 'Order Received'
    | 'In Tailoring & Alteration'
    | 'Quality Check & Packed'
    | 'Ready at Tex Valley / Dispatched'
    | 'Completed'
    | 'Cancelled';
  assignedTailor: string;
  tailorNotes: string;
  estimatedReadyTime: string;
  createdAt: string;
  updatedAt: string;
}

interface StoreDatabase {
  users: StoredUser[];
  orders: StoredOrder[];
}

const DATA_DIR = path.join(process.cwd(), '.eromen-data');
const DB_PATH = path.join(DATA_DIR, 'store.json');

const OWNER_EMAIL = 'eromen20@gmail.com';
const OWNER_PASSWORD = 'eromen';

const SEED_DATA: StoreDatabase = {
  users: [
    {
      id: 'usr-cust-01',
      name: 'Karthik Sundaram',
      email: 'karthik@eromen.in',
      phone: '+91 98427 11223',
      password: 'customer123',
      role: 'customer',
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    },
    {
      id: 'usr-seller-01',
      name: 'EROMEN Store Owner',
      email: OWNER_EMAIL,
      phone: '+91 98427 54321',
      password: OWNER_PASSWORD,
      role: 'seller',
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    },
  ],
  orders: [],
};

let memoryDb: StoreDatabase | null = null;

function readDb(): StoreDatabase {
  if (memoryDb) return memoryDb;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(SEED_DATA, null, 2), 'utf-8');
      memoryDb = JSON.parse(JSON.stringify(SEED_DATA));
      return memoryDb!;
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as StoreDatabase;
    // Ensure ONLY the authorized owner email/password holds the seller role
    const customerUsers = (parsed.users || []).filter(
      u => u.role !== 'seller' && u.email.toLowerCase() !== OWNER_EMAIL
    );
    const ownerUser: StoredUser = {
      id: 'usr-seller-01',
      name: 'EROMEN Store Owner',
      email: OWNER_EMAIL,
      phone: '+91 98427 54321',
      password: OWNER_PASSWORD,
      role: 'seller',
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    };
    parsed.users = [...customerUsers, ownerUser];
    const legacyIds = new Set(['ERO-2026-4821', 'ERO-2026-4819', 'ERO-2026-4815']);
    parsed.orders = (parsed.orders || []).filter(o => !legacyIds.has(o.id));
    memoryDb = parsed;
    return memoryDb;
  } catch {
    memoryDb = JSON.parse(JSON.stringify(SEED_DATA));
    return memoryDb!;
  }
}

function writeDb(db: StoreDatabase) {
  memoryDb = db;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch {
    // Fallback to in-memory if filesystem is read-only
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '1mb' }));

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', store: 'EROMEN Tex Valley' });
  });

  // Auth: Login
  app.post('/api/auth/login', (req, res) => {
    const { email, password, portalRole } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPass = String(password);

    // Strict check when signing into Owner / Seller Panel
    if (portalRole === 'seller') {
      if (cleanEmail !== OWNER_EMAIL || cleanPass !== OWNER_PASSWORD) {
        return res.status(401).json({
          error: 'Access denied. Owner panel opens only for the authorized EROMEN owner account.'
        });
      }
    }

    const db = readDb();
    const user = db.users.find(
      u => u.email.toLowerCase() === cleanEmail && u.password === cleanPass
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    if (portalRole === 'customer' && user.role === 'seller') {
      return res.status(403).json({
        error: 'Please switch to the Owner / Seller Panel tab to sign in as Store Owner.'
      });
    }

    const { password: _pwd, ...safeUser } = user;
    return res.json({ user: safeUser });
  });

  // Auth: Register (Customer account)
  app.post('/api/auth/register', (req, res) => {
    const { name, email, phone, password } = req.body || {};
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: 'Name, email, phone, and password are required.' });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    if (cleanEmail === OWNER_EMAIL) {
      return res.status(403).json({ error: 'This email is reserved for the store owner.' });
    }

    const db = readDb();
    const exists = db.users.some(
      u => u.email.toLowerCase() === cleanEmail
    );
    if (exists) {
      return res.status(409).json({ error: 'An account with this email already exists. Please sign in.' });
    }

    const newUser: StoredUser = {
      id: `usr-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      password: String(password),
      role: 'customer',
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    writeDb(db);

    const { password: _pwd, ...safeUser } = newUser;
    return res.status(201).json({ user: safeUser });
  });

  // Orders: List (Seller gets all orders; Customer gets own orders)
  app.get('/api/orders', (req, res) => {
    const { userId, role } = req.query;
    const db = readDb();

    if (role === 'seller') {
      const sorted = [...db.orders].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return res.json({ orders: sorted });
    }

    if (userId) {
      const mine = db.orders
        .filter(o => o.userId === String(userId))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return res.json({ orders: mine });
    }

    return res.status(401).json({ error: 'Authentication required to view orders.' });
  });

  // Orders: Create (Requires authenticated userId)
  app.post('/api/orders', (req, res) => {
    const body = req.body || {};
    if (!body.userId) {
      return res.status(401).json({ error: 'Please log in before placing an order.' });
    }
    if (!body.customerName || !body.customerPhone || !Array.isArray(body.items) || body.items.length === 0) {
      return res.status(400).json({ error: 'Invalid order details or empty cart.' });
    }

    const db = readDb();
    const now = new Date().toISOString();
    const newOrder: StoredOrder = {
      id: `ERO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: String(body.userId),
      customerName: String(body.customerName),
      customerPhone: String(body.customerPhone),
      customerEmail: body.customerEmail ? String(body.customerEmail) : undefined,
      deliveryType: body.deliveryType === 'pickup' ? 'pickup' : 'delivery',
      address: body.address ? String(body.address) : undefined,
      city: body.city ? String(body.city) : 'Perundurai',
      pincode: body.pincode ? String(body.pincode) : '638052',
      paymentMethod: ['cod', 'upi', 'store'].includes(body.paymentMethod) ? body.paymentMethod : 'upi',
      items: body.items,
      subtotal: Number(body.subtotal) || 0,
      discountAmount: Number(body.discountAmount) || 0,
      shippingFee: Number(body.shippingFee) || 0,
      total: Number(body.total) || 0,
      couponCode: body.couponCode ? String(body.couponCode) : undefined,
      status: 'Order Received',
      assignedTailor: 'Unassigned (Queue)',
      tailorNotes: 'Order received. Awaiting owner review & tailoring assignment.',
      estimatedReadyTime: body.deliveryType === 'pickup' ? 'Within 2 Hours' : '1-2 Business Days',
      createdAt: now,
      updatedAt: now,
    };

    db.orders.unshift(newOrder);
    writeDb(db);

    return res.status(201).json({ order: newOrder });
  });

  // Orders: Update procedure status / tailor notes (Seller / Owner Client Panel)
  app.patch('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const { status, assignedTailor, tailorNotes, estimatedReadyTime, sellerRole } = req.body || {};

    if (sellerRole !== 'seller') {
      return res.status(403).json({ error: 'Only authorized shop owners/sellers can update order procedures.' });
    }

    const db = readDb();
    const orderIndex = db.orders.findIndex(o => o.id === id);
    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    const existing = db.orders[orderIndex];
    const updated: StoredOrder = {
      ...existing,
      status: status || existing.status,
      assignedTailor: assignedTailor !== undefined ? String(assignedTailor) : existing.assignedTailor,
      tailorNotes: tailorNotes !== undefined ? String(tailorNotes) : existing.tailorNotes,
      estimatedReadyTime:
        estimatedReadyTime !== undefined ? String(estimatedReadyTime) : existing.estimatedReadyTime,
      updatedAt: new Date().toISOString(),
    };

    db.orders[orderIndex] = updated;
    writeDb(db);

    return res.json({ order: updated });
  });

  // Vite middleware in development, static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, 'localhost', () => {
    console.log(`EROMEN server running on http://localhost:${PORT}`);
  });
}

startServer();
