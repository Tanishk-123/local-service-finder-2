  /users/{userId}
  uid: string
  role: "customer" | "service_provider"
  name: string
  email: string
  phone?: string   // stored only if consented
  city?: string
  fcmTokens: string[]    // device tokens
  organizationRef?: /providerOrganizations/{orgId}
  createdAt: timestamp
  updatedAt: timestamp


/providerOrganizations/{orgId}  // optional for org provider
  orgId: string
  name: string
  address: string
  city: string
  contactInfo: {
    phone: string
    email?: string
  }
  memberRefs: [ /users/{uid} ]          // array of user document references and it is optional
  createdAt: timestamp
  updatedAt: timestamp


/serviceProviders/{providerId}
  providerId: string
  ownerUserRef: /users/{uid}   // owner account
  type: "individual" | "organization"
  organizationRef?: /providerOrganizations/{orgId}

  approved: boolean   // admin verification flag or approved by a automated service on the backend
  active: boolean

  displayName: string
  services: string[]              // e.g. ["plumbing", "cleaning"]
  expertise: string               // description of expertise
  basePrice: number               // starting price
  additionalCostRules: map        // dynamic cost rules

  city: string    // cononical city string (exact match)
  geoPoint?: geopoint  // optional; store only if consented
  timezone: string    // IANA tz, e.g., "Asia/Kolkata"

  rating: {
    avg: number
    count: number
  }

  contactInfo: {
    phoneMasked: string
    phoneFull?: string
    isPhoneMasked: boolean
  }

  recurringAvailability: [
    {
      weekday: number                 // 0–6
      startLocal: "HH:mm"   // "09:00"
      endLocal: "HH:mm"    //"17:00"
      slotDurationMins: number   // 60
      capacity: number  //1
    }
  ]

  createdAt: timestamp
  updatedAt: timestamp


/serviceProviders/{providerId}/slots/{slotId}
  slotId: string
  startAtUtc: timestamp
  endAtUtc: timestamp
  startAtLocal?: string  (optional human readable)
  timezone: string        

  capacity: number
  bookedCount: number 

  status: "open" | "full" | "cancelled"

  createdAt: timestamp
  updatedAt: timestamp


/bookings/{bookingId}
  bookingId: string

  providerRef: /serviceProviders/{providerId}
  customerRef: /users/{uid}
  slotRef?: /serviceProviders/{providerId}/slots/{slotId}

  serviceType: string

  slotStartAtUtc: timestamp
  slotEndAtUtc: timestamp

  status: 
    "pending" |
    "confirmed" |
    "rejected" |
    "auto_cancelled" |
    "cancelled" |
    "completed"

  pendingSince: timestamp  // used to Auto-cancel after 1 hour

  reminderScheduled: boolean
  reminderSent: boolean

  customerConsent: {
    phoneStored: boolean
    preciseLocationStored: boolean
  }

  customerLocation: {
    city: string
    address?: string
    lat?: number  // lat/lng only if consented
    lng?: number
  }

  providerContactReleasedAt?: timestamp

  createdAt: timestamp
  updatedAt: timestamp


/reviews/{reviewId}
  reviewId: string
  providerRef: /serviceProviders/{providerId}
  bookingRef: /bookings/{bookingId}
  customerRef: /users/{uid}
  rating: number (1...5)
  comment: string
  createdAt: timestamp


/notifications/{notificationId}  // optional audit trail
  toUserRef: /users/{uid}
  type: string
  payload: map
  sentAt: timestamp
  status: "sent" | "delivered" | "read"


/consents/{consentId}
  userRef: /users/{uid}
  type: string
  consentGiven: boolean
  timestamp: timestamp
