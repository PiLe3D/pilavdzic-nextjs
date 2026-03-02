import GameCard from '@/components/GameCard';

export default function Home() {
const games = [
  {
    title: 'Catch',
    description: 'Zabavna igrica hvatanja Mersy i djece!',
    url: '/catch',  // ✅ Lokalni Next.js route
    image: '/images/catch.jpg'
  },
  {
    title: 'Mersy Love',
    description: 'Romantična avantura puna iznenađenja!',
    url: '/mersy-love',  // ✅ Lokalni route
    image: '/images/mersy-love.jpg'
  },
  {
    title: 'Cigara',
    description: 'Jedinstvena igra koja će vas zabaviti satima!',
    url: '/cigara',  // ✅ Lokalni route
    image: '/images/cigara.jpg'
  },
  {
    title: 'Aster',
    description: 'Raspored i takmičenja plesnog kluba Aster',
    url: '/aster',
    image: '/images/aster-card.svg'
  }
];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center text-white mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            🎮 Dobrodošli 🎮
          </h1>
          <p className="text-xl md:text-2xl opacity-95">
            Evo nekih igrica sa kojima se igram
          </p>
        </header>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {games.map((game) => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center text-white opacity-80 mt-16">
          <p>© 2024 Pilavdžić.org - Sva prava zadržana</p>
        </footer>
      </div>
    </div>
  );
}