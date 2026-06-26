interface SectionDividerProps {
  from: 'dark' | 'light' | 'parchment' | 'sunset';
  to: 'dark' | 'light' | 'parchment' | 'sunset';
  pattern?: 'mango-leaves' | 'tree-rings' | 'none';
}

const bgMap = {
  dark: '#2C2417',
  light: '#FDF6E3',
  parchment: '#F5ECD7',
  sunset: 'linear-gradient(135deg, #D4A574 0%, #C4654A 50%, #A8423F 100%)',
};

export default function SectionDivider({ from, to, pattern = 'none' }: SectionDividerProps) {
  return (
    <div className="relative h-[100px] lg:h-[120px] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${bgMap[from]}, ${bgMap[to]})`,
        }}
      />
      {pattern !== 'none' && (
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url(/${pattern === 'mango-leaves' ? 'mango-leaf.svg' : 'tree-rings.svg'})`,
            backgroundRepeat: 'repeat',
            backgroundSize: pattern === 'mango-leaves' ? '80px' : '200px',
          }}
        />
      )}
    </div>
  );
}
