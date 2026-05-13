export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary border-t border-outline">
      <div className="flex flex-col items-center justify-center py-8 space-y-4 w-full max-w-7xl mx-auto px-4">
        <span className="text-xl font-bold tracking-tighter">IndustrialStore</span>
        <div className="flex flex-wrap justify-center gap-6">
          {['Conditions of Use', 'Privacy Notice', 'Your Ads Privacy Choices'].map(link => (
            <a key={link} className="text-on-primary-container hover:underline text-xs" href="#">
              {link}
            </a>
          ))}
        </div>
        <p className="text-on-primary-container text-xs">
          © {new Date().getFullYear()} IndustrialStore, Inc. or its affiliates
        </p>
      </div>
    </footer>
  );
}
