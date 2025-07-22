//copied form clerk documentation:
// https://clerk.com/docs/webhooks/sync-data
import { addUser } from '@/actions/userActions'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
    if(eventType === 'user.created') {
        const {id, first_name, last_name, email_addresses, image_url, username } = evt.data

        const user ={
            clerkId: id,
            firstName: first_name,
            lastName: last_name,
            email: email_addresses[0]?.email_address,
            photo: image_url,
            name: username,
        }
        await addUser(user)
        console.log(`User created with ID ${id} and name ${first_name} ${last_name}`)
        return new Response('New User created', { status: 200 })
    }
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt.data)

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}