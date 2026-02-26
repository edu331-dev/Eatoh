interface Props { 
  emoji: string; 
  title: string; 
  subtitle?: string; 
  action?: { label: string; onClick: () => void }; 
}

export default function EmptyState({ emoji, title, subtitle, action }: Props) {
  return (
    <div className="fade-in text-center py-20" role="status">
      <span className="text-6xl block mb-4">{emoji}</span>
      <h2 className="font-display text-2xl font-bold mb-2 text-ink dark:text-cream">{title}</h2>
      {subtitle && <p className="text-muted mb-6">{subtitle}</p>}
      {action && (
        <button 
          onClick={action.onClick} 
          className="btn-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}