import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();

  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto text-center">
      <motion.h2
        className="text-3xl md:text-4xl font-semibold mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Contact Us
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 text-left"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/** Name Field */}
        <div className="relative">
          <input
            type="text"
            placeholder="Your Name"
            {...register("name", { required: true })}
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            className={`w-full px-4 py-5 bg-white/5 text-white border border-white/10 rounded-md
      placeholder:text-transparent focus:outline-none focus:ring-2 peer
      ${errors.name ? "ring-red-500" : "focus:ring-primary"}`}
          />
          <label
            className={`absolute left-4 text-gray-500 text-sm transition-all
      ${
        nameValue
          ? "top-0.5 text-sm text-primary"
          : "top-5 text-base text-gray-500"
      }`}
          >
            Name
          </label>
        </div>

        {/** Email Field */}
        <div className="relative">
          <input
            type="email"
            placeholder="Your Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            className={`w-full px-4 py-5 bg-white/5 text-white border border-white/10 rounded-md placeholder-transparent focus:outline-none focus:ring-2 ${
              errors.email ? "ring-red-500" : "focus:ring-primary"
            } peer`}
          />
          <label
            className={`absolute left-4 text-gray-500 text-sm transition-all
    ${
      emailValue
        ? "top-0.5 text-sm text-primary"
        : "top-5 text-base text-gray-500"
    }`}
          >
            Email
          </label>
        </div>

        {/** Message Field */}
        <div className="relative">
          <textarea
            rows={4}
            {...register("message", { required: true })}
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            placeholder={messageValue ? "" : "Your Message"}
            className={`w-full px-4 py-5 bg-white/5 text-white border border-white/10 rounded-md 
    focus:outline-none focus:ring-2 peer resize-none
    placeholder-gray-500
    ${errors.message ? "ring-red-500" : "focus:ring-primary"}`}
          />

          <label
            className={`absolute left-4 text-gray-500 text-sm transition-all
      ${
        messageValue
          ? "top-2 text-sm text-primary"
          : "top-5 text-base text-gray-500"
      }`}
          ></label>
        </div>

        {/** Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`bg-primary text-white px-6 py-3 rounded-md font-medium tracking-wide transition ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting
            ? "Sending..."
            : isSubmitSuccessful && submitted
            ? "Sent ✓"
            : "Send Message"}
        </motion.button>
      </motion.form>
    </section>
  );
}
