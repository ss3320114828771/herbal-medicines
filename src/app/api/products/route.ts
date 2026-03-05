// app/api/products/route.ts
// Super ultra simplified version - No external packages

// Sample products data with images
const products = [
  {
    id: '1',
    name: 'Black Seed Oil',
    description: 'Pure cold-pressed black seed oil, known for its powerful healing properties. Supports immune system, respiratory health, and overall wellness.',
    price: 45.99,
    stock: 25,
    category: 'Immune Support',
    imageUrl: '/n1.jpeg',
    herbal: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Organic Honey with Herbs',
    description: 'Raw organic honey infused with traditional healing herbs. Perfect for sore throat, digestion, and natural energy.',
    price: 64.52,
    stock: 15,
    category: 'Digestive Health',
    imageUrl: '/n2.jpeg',
    herbal: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Herbal Immunity Booster',
    description: 'Powerful blend of echinacea, elderberry, and zinc to strengthen your immune system naturally.',
    price: 89.99,
    stock: 8,
    category: 'Immune Support',
    imageUrl: '/n3.jpeg',
    herbal: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Stress Relief Formula',
    description: 'Ashwagandha and holy basil combination to reduce stress, anxiety, and promote mental clarity.',
    price: 52.50,
    stock: 20,
    category: 'Stress Relief',
    imageUrl: '/n4.jpeg',
    herbal: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Digestive Herbal Tea',
    description: 'Soothing blend of peppermint, ginger, and fennel for optimal digestive health.',
    price: 45.25,
    stock: 30,
    category: 'Digestive Health',
    imageUrl: '/n5.jpeg',
    herbal: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Sleep Aid Complex',
    description: 'Natural blend of valerian root, chamomile, and passion flower for restful sleep.',
    price: 67.80,
    stock: 12,
    category: 'Sleep Aid',
    imageUrl: '/n6.jpeg',
    herbal: true,
    createdAt: new Date().toISOString()
  }
]

// GET /api/products
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const featured = url.searchParams.get('featured')
    
    let filteredProducts = [...products]
    
    // Filter by category
    if (category && category !== 'All') {
      filteredProducts = filteredProducts.filter(p => p.category === category)
    }
    
    // Get featured products (first 4 for demo)
    if (featured === 'true') {
      filteredProducts = filteredProducts.slice(0, 4)
    }
    
    return new Response(JSON.stringify(filteredProducts), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// POST /api/products
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.price || !body.category) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: name, price, category' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // Create new product
    const newProduct = {
      id: String(products.length + 1),
      name: body.name,
      description: body.description || '',
      price: parseFloat(body.price),
      stock: parseInt(body.stock) || 0,
      category: body.category,
      imageUrl: body.imageUrl || `/n${Math.floor(Math.random() * 6) + 1}.jpeg`,
      herbal: body.herbal !== false,
      createdAt: new Date().toISOString()
    }

    // In real app, save to database
    products.push(newProduct)

    return new Response(JSON.stringify({ 
      success: true,
      product: newProduct 
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// GET /api/products/[id]
export async function GET_BY_ID(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = products.find(p => p.id === params.id)
    
    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// PUT /api/products/[id]
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const productIndex = products.findIndex(p => p.id === params.id)
    
    if (productIndex === -1) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Update product
    products[productIndex] = {
      ...products[productIndex],
      ...body,
      price: body.price ? parseFloat(body.price) : products[productIndex].price,
      stock: body.stock ? parseInt(body.stock) : products[productIndex].stock,
      herbal: body.herbal !== undefined ? body.herbal : products[productIndex].herbal
    }

    return new Response(JSON.stringify({ 
      success: true,
      product: products[productIndex]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// DELETE /api/products/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const productIndex = products.findIndex(p => p.id === params.id)
    
    if (productIndex === -1) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Remove product
    products.splice(productIndex, 1)

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// Helper function to handle different methods for dynamic routes
export async function handler(request: Request, { params }: { params: { id: string } }) {
  const method = request.method

  switch (method) {
    case 'GET':
      return GET_BY_ID(request, { params })
    case 'PUT':
      return PUT(request, { params })
    case 'DELETE':
      return DELETE(request, { params })
    default:
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      })
  }
}