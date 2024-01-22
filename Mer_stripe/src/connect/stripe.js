const stripe = require('stripe')

const Stripe = stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16'
})

const createCheckoutSession = async (customerID, price) => {
  const session = await Stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer: customerID,
    line_items: [
      {
        price,
        quantity: 1
      }
    ],

    success_url: `${process.env.DOMAIN}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN}`
  })

  return session
}

const createBillingSession = async (customer) => {
  const session = await Stripe.billingPortal.sessions.create({
    customer,
    return_url: 'https://v118-27-74-113.eqwx.static.cnode.io'
  })
  return session
}

const getCustomerByID = async (id) => {
  const customer = await Stripe.customers.retrieve(id)
  return customer
}

const addNewCustomer = async (email) => {
  const customer = await Stripe.customers.create({
    email,
    description: 'New Customer'
  })

  return customer
}

const createWebhook = (rawBody, sig) => {
  const event = Stripe.webhooks.constructEvent(
    rawBody,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  )
  return event
}

module.exports = {
  getCustomerByID,
  addNewCustomer,
  createCheckoutSession,
  createBillingSession,
  createWebhook
}
