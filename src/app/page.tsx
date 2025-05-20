import Link from "next/link";
import Image from "next/image";
import {  MessageCircleQuestion, Library, UsersRound, Handshake, } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">

      <section className="bg-black text-white py-24">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Course Help Simplified
            </h2>
            <p className="text-3xl text-gray-400">
              Connect with peers in your classes
            </p>
            <div className="flex space-x-4">
              <Link
                href="/signup"
                className="bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-purple-500"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="border-2 border-purple-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-purple-500 hover:text-[#0E1E33] transition"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <Image
              src="/ccny_logo.gif"
              alt="MeetSync illustration"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-purple-700 mb-4">How can CCNY Connect help me?</h3>
          <p className="text-center text-gray-700 mb-12">
            With CCNY Connect, you have a one stop hub for help, communication and resources.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center">
              <MessageCircleQuestion className="w-12 h-12 text-gray-400 mb-4" />
              <h4 className="font-semibold text-xl text-purple-700 mb-2">Get your questions answered</h4>
              <p className="text-gray-600">
                Ask questions to your network on course topics, assignments and much more!
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center">
              <Library className="w-12 h-12 text-gray-400 mb-4" />
              <h4 className="font-semibold text-xl text-purple-700 mb-2">Course resources</h4>
              <p className="text-gray-600">
                Find resources to help you study and ace your classes with the expanding resource library. Have a resource to share? Upload it and help your friends out.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center">
              <UsersRound className="w-12 h-12 text-gray-400 mb-4" />
              <h4 className="font-semibold text-xl text-purple-700 mb-2">Find tutors</h4>
              <p className="text-gray-600">
                Find people who are comfortable helping in different courses. Feel like helping out in a course? Indicate so on your profile and watch the dms flow.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center">
              <Handshake className="w-12 h-12 text-gray-400 mb-4" />
              <h4 className="font-semibold text-xl text-purple-700 mb-2">Make new friends</h4>
              <p className="text-gray-600">
                Find mutual peers in courses you're taking, and message them here! 
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white pt-12 pb-6">
        <div className="container mx-auto px-6 text-center mb-6">
        </div>
        <div className="border-t-2 border-purple-700 mx-auto w-full my-4" />
        <div className="container mx-auto px-6">
          <p className="text-left text-sm">
            © 2025 CCNY Connect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}