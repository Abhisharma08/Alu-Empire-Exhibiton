import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="https://res.cloudinary.com/ddqqlfsjp/image/upload/v1752230081/Alu_Empire_Logo-removebg-preview_nrlo91.png"
        alt="Alu Empire Logo"
        width={200}
        height={100}
        className="dark:invert"
        priority
      />
    </div>
  );
}
