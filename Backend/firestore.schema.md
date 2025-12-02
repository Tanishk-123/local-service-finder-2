/users/{userId}
  uid, role, name, email, phone?, city?, fcmTokens: string[], createdAt, updatedAt, organizationRef?

/providerOrganizations/{orgId}
  orgId, name, address, city, contactInfo, memberRefs: [ /users/{uid} ], createdAt, updatedAt

/serviceProviders/{providerId}
  providerId
  ownerUserRef: /users/{uid}
  type: "individual"|"organization"
  organizationRef?: /providerOrganizations/{orgId}
  approved: boolean
  displayName
  services: string[]
  expertise: string
  basePrice: number
  additionalCostRules: map
  city: string
  geoPoint?: geopoint
  timezone: string
  rating: { avg: number, count: number }
  active: boolean
  contactInfo: { phoneMasked: string, phoneFull?: string, isPhoneMasked: boolean }
  recurringAvailability: [ { weekday: number, startLocal: "HH:mm", endLocal:"HH:mm", slotDurationMins: number, capacity: number } ]
  createdAt, updatedAt

/serviceProviders/{providerId}/slots/{slotId}
  slotId
  startAtUtc: timestamp
  endAtUtc: timestamp
  startAtLocal?: string
  timezone: string
  capacity: number
  bookedCount: number
  status: "open"|"full"|"cancelled"
  createdAt, updatedAt

/bookings/{bookingId}
  bookingId
  providerRef: /serviceProviders/{providerId}
  customerRef: /users/{uid}
  serviceType: string
  slotRef?: /serviceProviders/{providerId}/slots/{slotId}
  slotStartAtUtc, slotEndAtUtc
  status: "pending"|"confirmed"|"rejected"|"auto_cancelled"|"cancelled"|"completed"
  pendingSince: timestamp
  reminderScheduled: boolean
  reminderSent: boolean
  customerConsent: { phoneStored: boolean, preciseLocationStored: boolean }
  customerLocation: { city, address?, lat?, lng? }
  providerContactReleasedAt?: timestamp
  createdAt, updatedAt

/reviews/{reviewId}
  reviewId, providerRef, bookingRef, customerRef, rating, comment, createdAt

/notifications/{notificationId}
  toUserRef, type, payload, sentAt, status

/consents/{consentId}
  userRef, type, consentGiven, timestamp