const STUDENT_NAME = "Your Name Here"; // Replace with your actual name
const STUDENT_NUMBER = "12345678"; // Replace with your actual student number

export default function Footer() {
  const currentDate = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {currentDate} {STUDENT_NAME} | Student Number: {STUDENT_NUMBER} | Date: {new Date().toLocaleDateString()}
        </p>
      </div>
    </footer>
  );
}