import { useState } from 'react';

export default function PersonalTrainerWebsite() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: '',
    date: '',
    time: '',
  });

  const [bookings, setBookings] = useState([]);

  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  const [bmiData, setBmiData] = useState({
    weight: '',
    height: '',
  });

  const [bmiResult, setBmiResult] = useState(null);

  const [calorieData, setCalorieData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
  });

  const [calorieResult, setCalorieResult] = useState(null);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! I am your AI Fitness Assistant. Ask me about workouts, fat loss, nutrition, or fitness tips.',
    },
  ]);

const handleChatbot = async () => {
  if (!chatInput.trim()) return;

  const currentMessage = chatInput;

  const userMessage = {
    sender: "user",
    text: currentMessage,
  };

  setMessages((prev) => [...prev, userMessage]);

  setChatInput("");

  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: currentMessage,
      }),
    });

    const data = await response.json();

    console.log("AI DATA:", data);

    const botMessage = {
      sender: "bot",
      text: data.reply || "No response from AI",
    };

    setMessages((prev) => [...prev, botMessage]);

  } catch (error) {
    console.error("CHATBOT ERROR:", error);

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "Error connecting to AI server.",
      },
    ]);
  }
};

  const calculateBMI = () => {
    const heightInMeters = bmiData.height / 100;
    const bmi = (
      bmiData.weight /
      (heightInMeters * heightInMeters)
    ).toFixed(1);

    let category = 'Normal';

    if (bmi < 18.5) category = 'Underweight';
    else if (bmi >= 25) category = 'Overweight';
    else if (bmi >= 30) category = 'Obese';

    setBmiResult({ bmi, category });
  };

  const calculateCalories = () => {
    let bmr;

    if (calorieData.gender === 'male') {
      bmr =
        10 * calorieData.weight +
        6.25 * calorieData.height -
        5 * calorieData.age +
        5;
    } else {
      bmr =
        10 * calorieData.weight +
        6.25 * calorieData.height -
        5 * calorieData.age -
        161;
    }

    setCalorieResult(Math.round(bmr));
  };

  const handleBooking = () => {
    if (!bookingData.name || !bookingData.email || !bookingData.date) {
      alert('Please fill all required booking fields');
      return;
    }

    setBookings([...bookings, bookingData]);

    alert('Consultation booked successfully!');

    setBookingData({
      name: '',
      email: '',
      phone: '',
      goal: '',
      date: '',
      time: '',
    });
  };
  const programs = [
    {
      title: 'Weight Loss Program',
      desc: 'Personalized fat loss coaching with nutrition guidance and progress tracking.',
    },
    {
      title: 'Muscle Building',
      desc: 'Structured hypertrophy and strength training plans for all levels.',
    },
    {
      title: 'Online Coaching',
      desc: 'Remote fitness coaching with workout plans and weekly check-ins.',
    },
  ];

  const testimonials = [
    {
      name: 'Rahul',
      text: 'I lost 12kg in 4 months and completely changed my lifestyle.',
    },
    {
      name: 'Ananya',
      text: 'The training plans were easy to follow and super effective.',
    },
    {
      name: 'Vikram',
      text: 'Best coach I have worked with. Strength and confidence improved massively.',
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-800 sticky top-0 bg-black/90 backdrop-blur z-50">
        <h1 className="text-2xl font-bold tracking-wide">FITCOACH</h1>

        <div className="hidden md:flex gap-8 text-sm text-zinc-300">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#programs" className="hover:text-white transition">Programs</a>
          <a href="#transformations" className="hover:text-white transition">Transformations</a>
          <a href="#testimonials" className="hover:text-white transition">Testimonials</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              console.log('Admin dashboard toggled');
              setShowAdminDashboard((prev) => !prev);
            }}
            className="border border-zinc-700 px-4 py-2 rounded-xl hover:bg-zinc-900 transition text-sm"
          >
            Admin Dashboard
          </button>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-300">
                Welcome, {user.name || 'Member'}
              </span>

              <button
                onClick={() => setIsLoggedIn(false)}
                className="border border-zinc-700 px-4 py-2 rounded-xl hover:bg-zinc-900 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
            >
              Login / Signup
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-10 px-8 lg:px-20 py-20 items-center">
        <div>
          <p className="uppercase tracking-widest text-zinc-400 mb-4">
            Certified Personal Trainer
          </p>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
            Transform Your Body & Mind
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-xl">
            Helping busy people lose fat, gain muscle, and build sustainable
            fitness habits with personalized coaching.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition">
              Start Transformation
            </button>

            <button className="border border-zinc-600 px-6 py-3 rounded-2xl hover:bg-zinc-900 transition">
              View Programs
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12">
            <div>
              <h2 className="text-3xl font-bold">8+</h2>
              <p className="text-zinc-400">Years Experience</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">500+</h2>
              <p className="text-zinc-400">Clients Trained</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">15</h2>
              <p className="text-zinc-400">Certifications</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
            alt="Trainer"
            className="rounded-3xl shadow-2xl h-[650px] w-full object-cover"
          />

          <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur p-5 rounded-2xl border border-zinc-700">
            <p className="text-sm text-zinc-400">Trusted By</p>
            <h3 className="text-2xl font-bold">500+ Happy Clients</h3>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-8 lg:px-20 py-20 bg-zinc-950">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-widest text-zinc-500 mb-3">
            About The Trainer
          </p>

          <h2 className="text-4xl font-bold mb-6">
            Fitness Coaching Built Around Real Results
          </h2>

          <p className="text-zinc-400 leading-relaxed text-lg">
            I specialize in strength training, fat loss transformation, and
            lifestyle coaching. My mission is to help clients build confidence,
            improve health, and create sustainable habits through science-based
            fitness programs.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="px-8 lg:px-20 py-20">
        <div className="flex items-center justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="uppercase tracking-widest text-zinc-500 mb-3">
              Programs
            </p>

            <h2 className="text-4xl font-bold">
              Training Programs & Services
            </h2>
          </div>

          <button className="border border-zinc-700 px-5 py-3 rounded-xl hover:bg-zinc-900 transition">
            View All Programs
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 hover:border-white transition"
            >
              <h3 className="text-2xl font-bold mb-4">{program.title}</h3>

              <p className="text-zinc-400 leading-relaxed mb-6">
                {program.desc}
              </p>

              <button className="font-semibold hover:underline">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Transformations */}
      <section
        id="transformations"
        className="px-8 lg:px-20 py-20 bg-zinc-950"
      >
        <div className="text-center mb-14">
          <p className="uppercase tracking-widest text-zinc-500 mb-3">
            Transformations
          </p>

          <h2 className="text-4xl font-bold mb-5">
            Real Client Results
          </h2>

          <p className="text-zinc-400 max-w-2xl mx-auto">
            See how clients transformed their physique, mindset, and lifestyle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="relative overflow-hidden rounded-3xl">
              <img
                src={`https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop`}
                alt="Transformation"
                className="h-[450px] w-full object-cover hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold">12 Week Transformation</h3>
                <p className="text-zinc-300">-10kg Fat Loss</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-8 lg:px-20 py-20">
        <div className="text-center mb-14">
          <p className="uppercase tracking-widest text-zinc-500 mb-3">
            Testimonials
          </p>

          <h2 className="text-4xl font-bold">
            What Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
            >
              <div className="flex gap-1 mb-5 text-xl">★★★★★</div>

              <p className="text-zinc-300 leading-relaxed mb-6">
                “{testimonial.text}”
              </p>

              <h4 className="font-bold">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
<section className="px-8 lg:px-20 py-20 bg-zinc-950">
  <div className="text-center mb-14">
    <p className="uppercase tracking-widest text-zinc-500 mb-3">
      Pricing
    </p>

    <h2 className="text-4xl font-bold mb-4">
      Flexible Coaching Plans
    </h2>

    <p className="text-zinc-400 max-w-2xl mx-auto">
      Choose the perfect coaching plan based on your goals and commitment level.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-8">
    
    {/* Starter */}
    <div className="bg-black border border-zinc-800 rounded-3xl p-8 text-center hover:border-white transition">
      <h3 className="text-2xl font-bold mb-4">
        Starter
      </h3>

      <div className="text-5xl font-extrabold mb-2">
        ₹1,999
      </div>

      <p className="text-zinc-500 mb-6">
        / month
      </p>

      <ul className="space-y-4 text-zinc-300 mb-10 text-left">
        <li>✔ Personalized Workout Plan</li>
        <li>✔ Basic Nutrition Guide</li>
        <li>✔ Home & Gym Workouts</li>
        <li>✔ Monthly Progress Tracking</li>
        <li>✔ Email Support</li>
      </ul>

      <button className="w-full bg-white text-black py-3 rounded-2xl font-bold hover:scale-105 transition">
        Get Started
      </button>
    </div>

    {/* Pro */}
    <div className="bg-white text-black border border-white rounded-3xl p-8 text-center scale-105 shadow-2xl relative">
      
      <div className="absolute top-4 right-4 bg-black text-white text-xs px-3 py-1 rounded-full">
        MOST POPULAR
      </div>

      <h3 className="text-2xl font-bold mb-4">
        Pro Coaching
      </h3>

      <div className="text-5xl font-extrabold mb-2">
        ₹4,999
      </div>

      <p className="text-zinc-700 mb-6">
        / month
      </p>

      <ul className="space-y-4 text-zinc-800 mb-10 text-left">
        <li>✔ Custom Workout & Diet Plan</li>
        <li>✔ Weekly Check-ins</li>
        <li>✔ Fat Loss / Muscle Gain Coaching</li>
        <li>✔ WhatsApp Support</li>
        <li>✔ Form Correction Assistance</li>
        <li>✔ Supplement Guidance</li>
      </ul>

      <button className="w-full bg-black text-white py-3 rounded-2xl font-bold hover:scale-105 transition">
        Choose Pro
      </button>
    </div>

    {/* Elite */}
    <div className="bg-black border border-zinc-800 rounded-3xl p-8 text-center hover:border-white transition">
      <h3 className="text-2xl font-bold mb-4">
        Elite Transformation
      </h3>

      <div className="text-5xl font-extrabold mb-2">
        ₹9,999
      </div>

      <p className="text-zinc-500 mb-6">
        / month
      </p>

      <ul className="space-y-4 text-zinc-300 mb-10 text-left">
        <li>✔ 1-on-1 Personal Coaching</li>
        <li>✔ Advanced Nutrition Strategy</li>
        <li>✔ Daily Accountability</li>
        <li>✔ Video Call Consultations</li>
        <li>✔ Injury Prevention Guidance</li>
        <li>✔ Priority Support</li>
        <li>✔ Lifestyle & Habit Coaching</li>
      </ul>

      <button className="w-full bg-white text-black py-3 rounded-2xl font-bold hover:scale-105 transition">
        Join Elite
      </button>
    </div>
  </div>
</section>

      {/* Fitness Calculators */}
      <section className="px-8 lg:px-20 py-20 bg-zinc-950">
        <div className="text-center mb-14">
          <p className="uppercase tracking-widest text-zinc-500 mb-3">
            Fitness Tools
          </p>

          <h2 className="text-5xl font-bold">
            BMI & Calorie Calculators
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-black border border-zinc-800 rounded-3xl p-8">
            <h3 className="text-3xl font-bold mb-6">
              BMI Calculator
            </h3>

            <div className="space-y-5">
              <input
                type="number"
                placeholder="Weight (kg)"
                value={bmiData.weight}
                onChange={(e) =>
                  setBmiData({ ...bmiData, weight: e.target.value })
                }
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 outline-none"
              />

              <input
                type="number"
                placeholder="Height (cm)"
                value={bmiData.height}
                onChange={(e) =>
                  setBmiData({ ...bmiData, height: e.target.value })
                }
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 outline-none"
              />

              <button
                onClick={calculateBMI}
                className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:scale-105 transition"
              >
                Calculate BMI
              </button>

              {bmiResult && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-6">
                  <h4 className="text-2xl font-bold mb-2">
                    Your BMI: {bmiResult.bmi}
                  </h4>

                  <p className="text-zinc-400">
                    Category: {bmiResult.category}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-black border border-zinc-800 rounded-3xl p-8">
            <h3 className="text-3xl font-bold mb-6">
              Daily Calorie Calculator
            </h3>

            <div className="space-y-5">
              <input
                type="number"
                placeholder="Age"
                value={calorieData.age}
                onChange={(e) =>
                  setCalorieData({ ...calorieData, age: e.target.value })
                }
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 outline-none"
              />

              <input
                type="number"
                placeholder="Weight (kg)"
                value={calorieData.weight}
                onChange={(e) =>
                  setCalorieData({ ...calorieData, weight: e.target.value })
                }
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 outline-none"
              />

              <input
                type="number"
                placeholder="Height (cm)"
                value={calorieData.height}
                onChange={(e) =>
                  setCalorieData({ ...calorieData, height: e.target.value })
                }
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 outline-none"
              />

              <select
                value={calorieData.gender}
                onChange={(e) =>
                  setCalorieData({ ...calorieData, gender: e.target.value })
                }
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <button
                onClick={calculateCalories}
                className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:scale-105 transition"
              >
                Calculate Calories
              </button>

              {calorieResult && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-6">
                  <h4 className="text-2xl font-bold mb-2">
                    Estimated Calories
                  </h4>

                  <p className="text-zinc-400">
                    Your body needs approximately
                  </p>

                  <p className="text-4xl font-extrabold mt-3">
                    {calorieResult} kcal/day
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-8 lg:px-20 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="uppercase tracking-widest text-zinc-500 mb-3">
              Contact
            </p>

            <h2 className="text-5xl font-bold mb-6">
              Ready To Start Your Fitness Journey?
            </h2>

            <p className="text-zinc-400 leading-relaxed mb-8">
              Book a free consultation and get a personalized roadmap to your
              goals.
            </p>

            <div className="space-y-4 text-zinc-300">
              <p>📧 trainer@email.com</p>
              <p>📱 +91 9876543210</p>
              <p>📍 Chennai, India</p>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl space-y-5">
            <h3 className="text-3xl font-bold mb-4">
              Book Your Consultation
            </h3>

            <input
              type="text"
              placeholder="Your Name"
              value={bookingData.name}
              onChange={(e) =>
                setBookingData({ ...bookingData, name: e.target.value })
              }
              className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={bookingData.email}
              onChange={(e) =>
                setBookingData({ ...bookingData, email: e.target.value })
              }
              className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={bookingData.phone}
              onChange={(e) =>
                setBookingData({ ...bookingData, phone: e.target.value })
              }
              className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none"
            />

            <select
              value={bookingData.goal}
              onChange={(e) =>
                setBookingData({ ...bookingData, goal: e.target.value })
              }
              className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none"
            >
              <option value="">Select Fitness Goal</option>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Muscle Building">Muscle Building</option>
              <option value="Strength Training">Strength Training</option>
              <option value="General Fitness">General Fitness</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={bookingData.date}
                onChange={(e) =>
                  setBookingData({ ...bookingData, date: e.target.value })
                }
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none"
              />

              <input
                type="time"
                value={bookingData.time}
                onChange={(e) =>
                  setBookingData({ ...bookingData, time: e.target.value })
                }
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none"
              />
            </div>

            <button
              onClick={handleBooking}
              className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:scale-105 transition"
            >
              Confirm Booking
            </button>

            {bookings.length > 0 && (
              <div className="mt-8 border-t border-zinc-800 pt-6">
                <h4 className="text-2xl font-bold mb-4">
                  Upcoming Bookings
                </h4>

                <div className="space-y-4">
                  {bookings.map((booking, index) => (
                    <div
                      key={index}
                      className="bg-black border border-zinc-800 rounded-2xl p-5"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                          <h5 className="font-bold text-lg">
                            {booking.name}
                          </h5>

                          <p className="text-zinc-400 text-sm">
                            {booking.goal || 'Fitness Consultation'}
                          </p>
                        </div>

                        <div className="text-right text-sm text-zinc-300">
                          <p>{booking.date}</p>
                          <p>{booking.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Admin Dashboard */}
      {showAdminDashboard && (
        <section className="px-8 lg:px-20 py-20 bg-zinc-950 border-t border-zinc-800">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="uppercase tracking-widest text-zinc-500 mb-2">
                Admin Dashboard
              </p>

              <h2 className="text-5xl font-bold">
                Trainer Management Panel
              </h2>
            </div>

            <button
              onClick={() => setShowAdminDashboard(false)}
              className="border border-zinc-700 px-5 py-3 rounded-xl hover:bg-zinc-900 transition"
            >
              Close Dashboard
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-black border border-zinc-800 rounded-3xl p-6">
              <p className="text-zinc-400 mb-2">Total Bookings</p>
              <h3 className="text-5xl font-extrabold">
                {bookings.length}
              </h3>
            </div>

            <div className="bg-black border border-zinc-800 rounded-3xl p-6">
              <p className="text-zinc-400 mb-2">Active Clients</p>
              <h3 className="text-5xl font-extrabold">48</h3>
            </div>

            <div className="bg-black border border-zinc-800 rounded-3xl p-6">
              <p className="text-zinc-400 mb-2">Monthly Revenue</p>
              <h3 className="text-5xl font-extrabold">₹85K</h3>
            </div>

            <div className="bg-black border border-zinc-800 rounded-3xl p-6">
              <p className="text-zinc-400 mb-2">Programs Sold</p>
              <h3 className="text-5xl font-extrabold">132</h3>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-black border border-zinc-800 rounded-3xl p-8">
              <h3 className="text-3xl font-bold mb-6">
                Recent Bookings
              </h3>

              {bookings.length === 0 ? (
                <p className="text-zinc-400">
                  No bookings available yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking, index) => (
                    <div
                      key={index}
                      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                          <h4 className="text-xl font-bold">
                            {booking.name}
                          </h4>

                          <p className="text-zinc-400 text-sm">
                            {booking.email}
                          </p>
                        </div>

                        <div className="text-right text-sm text-zinc-300">
                          <p>{booking.date}</p>
                          <p>{booking.time}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-3 flex-wrap">
                        <button className="bg-white text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition">
                          Approve
                        </button>

                        <button className="border border-zinc-700 px-4 py-2 rounded-xl hover:bg-zinc-800 transition">
                          Reschedule
                        </button>

                        <button className="border border-red-700 text-red-400 px-4 py-2 rounded-xl hover:bg-red-950 transition">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-black border border-zinc-800 rounded-3xl p-8">
              <h3 className="text-3xl font-bold mb-6">
                Analytics Overview
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Client Satisfaction</span>
                    <span>95%</span>
                  </div>

                  <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[95%] bg-white rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Monthly Goal Completion</span>
                    <span>82%</span>
                  </div>

                  <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[82%] bg-white rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Lead Conversion Rate</span>
                    <span>68%</span>
                  </div>

                  <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[68%] bg-white rounded-full" />
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-zinc-800 pt-8">
                <h4 className="text-2xl font-bold mb-5">
                  Quick Actions
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-white text-black py-4 rounded-2xl font-bold hover:scale-105 transition">
                    Add Program
                  </button>

                  <button className="border border-zinc-700 py-4 rounded-2xl hover:bg-zinc-900 transition">
                    Send Newsletter
                  </button>

                  <button className="border border-zinc-700 py-4 rounded-2xl hover:bg-zinc-900 transition">
                    Upload Transformations
                  </button>

                  <button className="border border-zinc-700 py-4 rounded-2xl hover:bg-zinc-900 transition">
                    Manage Pricing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-2">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>

            <p className="text-zinc-400 mb-8">
              {isSignup
                ? 'Join the fitness transformation journey.'
                : 'Login to access your fitness dashboard.'}
            </p>

            <div className="space-y-5">
              {isSignup && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={user.name}
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none"
                />
              )}

              <input
                type="email"
                placeholder="Email Address"
                value={user.email}
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value })
                }
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none"
              />

              <button
                onClick={() => {
                  setIsLoggedIn(true);
                  setShowAuthModal(false);
                }}
                className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:scale-105 transition"
              >
                {isSignup ? 'Create Account' : 'Login'}
              </button>
            </div>

            <p className="text-zinc-400 text-center mt-6">
              {isSignup
                ? 'Already have an account?'
                : "Don't have an account?"}

              <button
                onClick={() => setIsSignup(!isSignup)}
                className="ml-2 text-white font-semibold hover:underline"
              >
                {isSignup ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      )}

      {/* AI Fitness Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className="w-[350px] h-[500px] bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col mb-4">
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-black">
              <div>
                <h3 className="font-bold text-lg">
                  AI Fitness Coach
                </h3>

                <p className="text-xs text-zinc-400">
                  Ask anything about fitness
                </p>
              </div>

              <button
                onClick={() => setChatOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-white text-black'
                        : 'bg-zinc-800 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-zinc-800 bg-black flex gap-3">
              <input
                type="text"
                placeholder="Ask about fitness..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleChatbot();
                  }
                }}
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none"
              />

              <button
                onClick={handleChatbot}
                className="bg-white text-black px-5 rounded-xl font-bold hover:scale-105 transition"
              >
                Send
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-white text-black w-16 h-16 rounded-full shadow-2xl text-2xl font-bold hover:scale-110 transition"
        >
          💬
        </button>
      </div>

      <footer className="border-t border-zinc-800 px-8 lg:px-20 py-8 text-center text-zinc-500">
        © 2026 FITCOACH. All Rights Reserved.
      </footer>
    </div>
  );
}
