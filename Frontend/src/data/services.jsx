import { v4 as uuidv4 } from "uuid";

const services = [
  {
    id: uuidv4(),
    title: "Experienced Plumber",
    category: "Plumbing",
    rating: 4.6,
    price: 499,
    location: "Mumbai",
    description: "Leak repairs, pipe replacement, bathroom fittings.",
    image: "🔧",
    reviews: [
      { id: uuidv4(), name: "Ravi", text: "Fast and neat job", rating: 5 },
    ]
  },
  {
    id: uuidv4(),
    title: "Certified Electrician",
    category: "Electrical",
    rating: 4.5,
    price: 399,
    location: "Pune",
    description: "Wiring, fittings, AC repair, safety checks.",
    image: "💡",
    reviews: []
  },
  {
    id: uuidv4(),
    title: "Home Tutor - Maths",
    category: "Tutoring",
    rating: 4.8,
    price: 699,
    location: "Delhi",
    description: "Experienced Math tutor for school & competitive exams.",
    image: "📘",
    reviews: []
  },
  {
    id: uuidv4(),
    title: "Home Cleaning Service",
    category: "Cleaning",
    rating: 4.3,
    price: 599,
    location: "Bengaluru",
    description: "Full house deep cleaning, kitchen & bathroom cleaning.",
    image: "🧹",
    reviews: []
  },
  // add more for demo...
];

export default services;
