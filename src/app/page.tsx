import { Logo } from '@/components/logo';
import { InterestForm } from '@/components/interest-form';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="w-full max-w-md animate-in fade-in duration-1000 ease-in-out">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <InterestForm />
      </div>
    </main>
  );
}
