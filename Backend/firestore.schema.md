  /users/{userId}
  uid: string
  role: "customer" | "service-provider" | "admin"
  name: string
  email: string
  phone?: string
  city?: string
  fcmTokens: string[]
  organizationRef?: /providerOrganizations/{orgId}
  createdAt: timestamp
  updatedAt: timestamp


/providerOrganizations/{orgId}
  orgId: string
  name: string
  address: string
  city: string
  contactInfo: {
    phone: string
    email?: string
  }
  memberRefs: [ /users/{uid} ]          // array of user document references
  createdAt: timestamp
  updatedAt: timestamp


/serviceProviders/{providerId}
  providerId: string
  ownerUserRef: /users/{uid}
  type: "individual" | "organization"
  organizationRef?: /providerOrganizations/{orgId}

  approved: boolean
  active: boolean

  displayName: string
  services: string[]              // e.g. ["plumbing", "cleaning"]
  expertise: string               // description of expertise
  basePrice: number               // starting price
  additionalCostRules: map        // dynamic cost rules

  city: string
  geoPoint?: geopoint
  timezone: string

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
      startLocal: "HH:mm"
      endLocal: "HH:mm"
      slotDurationMins: number
      capacity: number
    }
  ]

  createdAt: timestamp
  updatedAt: timestamp


/serviceProviders/{providerId}/slots/{slotId}
  slotId: string
  startAtUtc: timestamp
  endAtUtc: timestamp
  startAtLocal?: string
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

  pendingSince: timestamp

  reminderScheduled: boolean
  reminderSent: boolean

  customerConsent: {
    phoneStored: boolean
    preciseLocationStored: boolean
  }

  customerLocation: {
    city: string
    address?: string
    lat?: number
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
  rating: number
  comment: string
  createdAt: timestamp


/notifications/{notificationId}
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
