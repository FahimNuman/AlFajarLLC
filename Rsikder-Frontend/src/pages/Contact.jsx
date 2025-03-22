import { useState } from 'react';
import Footer from '../components/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <><div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            {/* Header Section */}
            <header className="bg-indigo-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Get in Touch</h1>
                    <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
                        We're excited to hear from you! Whether you have questions, feedback, or just want to say hello, we're here for you.
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-padd-container max-xl:mt-8 mb-16px-4 -mt-12 pb-16">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info Card */}
                    <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
                        <h2 className="text-2xl font-bold text-indigo-900 mb-6">Contact Information</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <i className="fas fa-map-marker-alt text-indigo-600 mt-1"></i>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Location</h3>
                                    <p className="text-gray-600">New York, United States 11377</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <i className="fas fa-phone-alt text-indigo-600 mt-1"></i>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Phone</h3>
                                    <a href="tel:+13476536082" className="text-gray-600 hover:text-indigo-600">
                                        +1 (347) 653-6082
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <i className="fas fa-envelope text-indigo-600 mt-1"></i>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Email</h3>
                                    <a href="mailto:mahabubulhaque2018@gmail.com" className="text-gray-600 hover:text-indigo-600 break-all">
                                        mahabubulhaque2018@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-indigo-900 mb-4">Connect With Us</h3>
                            <div className="flex gap-6 justify-center">
                                {[
                                    { href: "https://facebook.com", icon: "fab fa-facebook-f" },
                                    { href: "https://twitter.com", icon: "fab fa-twitter" },
                                    { href: "https://instagram.com", icon: "fab fa-instagram" },
                                    { href: "https://linkedin.com", icon: "fab fa-linkedin-in" }
                                ].map((social) => (
                                    <a
                                        key={social.icon}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-indigo-600 text-xl transition-colors"
                                    >
                                        <i className={social.icon}></i>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Card */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-indigo-900 mb-6">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                    Your Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                    Your Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    rows="4"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition resize-y" />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${isSubmitting
                                        ? 'bg-indigo-400 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                            {submitStatus === 'success' && (
                                <p className="text-green-600 text-center font-medium">Message sent successfully!</p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="text-red-600 text-center font-medium">Failed to send. Please try again.</p>
                            )}
                        </form>
                    </div>
                </div>
            </main>

            {/* Map Section */}
            <section className="bg-indigo-900 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">Our Location</h2>
                    <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
                        <iframe
                            title="Google Map - New York Office"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.066763891511!2d-73.90099768459375!3d40.74982497932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25f0b3a3b4e63%3A0x2b5c8b1e8f1e9d5!2sNew%20York%2C%20NY%2011377!5e0!3m2!1sen!2sus!4v1635789201355!5m2!1sen!2sus"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            aria-label="Google Maps location for New York, NY 11377" />
                    </div>
                </div>
            </section>
        </div><Footer /></>
    );
};

export default Contact;