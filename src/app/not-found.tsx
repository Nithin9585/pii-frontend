import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../components/ui/button';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 space-y-6">
      
      <div className="flex items-center space-x-2">
        <Image 
          src="/Secure_docs_logo.jpg" 
          alt="Securedocs Logo"
          width={40}
          height={40}
          className="rounded-lg"
        />
        <span className="text-2xl font-bold text-blue-700">SecureDocs</span>
      </div>

      <div>
        <h1 className="text-4xl font-bold text-blue-600 mb-2">404 - Page Not Found</h1>
        <p className="text-gray-600">We couldn't find the page you're looking for.</p>
      </div>

      <Link href="/">
        <Button variant="secondary" className="text-blue-600 hover:border-blue-400">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
