import { useEffect, useState } from "react";
import { getMealById } from "../lib/api";
import { getIngredients, parseSteps, getYouTubeId } from "../lib/utils";
import type { Meal, MealSummary } from "../types/meal";

interface Props { mealId: string; isFavorite: boolean; onToggleFavorite: (meal: MealSummary) => void; onClose: () => void; }

export default function RecipeDetails({ mealId, isFavorite, onToggleFavorite, onClose }: Props) {
  const [meal, setMeal]       = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  useEffect(() => {
    setLoading(true); setError(null);
    getMealById(mealId)
      .then((m) => { if (!m) throw new Error("Not found"); setMeal(m); })
      .catch(() => setError("Failed to load the recipe. Please try again."))
      .finally(() => setLoading(false));
  }, [mealId]);

  const ingredients = meal ? getIngredients(meal) : [];
  const steps       = meal ? parseSteps(meal.strInstructions) : [];
  const ytId        = meal ? getYouTubeId(meal.strYoutube) : null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button onClick={onClose} aria-label="Close"
          style={{ position: "absolute", top: 14, right: 14, zIndex: 10, background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: 38, height: 38, fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          ×
        </button>

        {loading && (
          <div style={{ padding: 64, textAlign: "center" }}>
            <div className="spinner" style={{ margin: "0 auto 18px" }} />
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Loading recipe…</p>
          </div>
        )}

        {!loading && error && (
          <div style={{ padding: 64, textAlign: "center" }}>
            <span style={{ fontSize: 48 }}>⚠️</span>
            <p style={{ marginTop: 16, color: "var(--terracotta)", fontWeight: 500 }}>{error}</p>
          </div>
        )}

        {!loading && meal && (
          <>
            <div style={{ position: "relative" }}>
              <img src={meal.strMealThumb} alt={meal.strMeal}
                style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,18,8,0.72) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: 20, left: 24, right: 64 }}>
                <h2 className="font-display" style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 10 }}>{meal.strMeal}</h2>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {meal.strCategory && <span className="tag tag-amber">{meal.strCategory}</span>}
                  {meal.strArea     && <span className="tag tag-sage">🌍 {meal.strArea}</span>}
                  {meal.strTags && meal.strTags.split(",").slice(0, 2).map((t) => <span key={t} className="tag tag-terracotta">{t.trim()}</span>)}
                </div>
              </div>
              <button className={`fav-btn${isFavorite ? " is-fav" : ""}`}
                style={{ position: "absolute", top: 14, right: 58 }}
                onClick={() => onToggleFavorite(meal as unknown as MealSummary)}
                aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}>
                {isFavorite ? "❤️" : "🤍"}
              </button>
            </div>

            <div style={{ padding: "26px 28px 44px", overflowY: "auto", maxHeight: "60vh" }}>
              <SectionTitle emoji="🥘" title="Ingredients" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 30 }}>
                {ingredients.map(({ ingredient, measure }, i) => (
                  <div key={i} className="ing-pill">
                    {measure && <strong style={{ color: "var(--ink)" }}>{measure}</strong>}
                    <span style={{ color: "var(--muted)" }}>{ingredient}</span>
                  </div>
                ))}
              </div>

              {steps.length > 0 && (
                <>
                  <SectionTitle emoji="📋" title="Instructions" />
                  <div style={{ marginBottom: 30 }}>
                    {steps.map((step, i) => (
                      <div key={i} className="recipe-step">
                        <div className="step-num">{i + 1}</div>
                        <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--ink)", paddingTop: 3 }}>{step}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {ytId && (
                <>
                  <SectionTitle emoji="🎬" title="Watch & Cook" />
                  <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 24, aspectRatio: "16 / 9" }}>
                    <iframe width="100%" height="100%"
                      src={`https://www.youtube.com/embed/${ytId}`}
                      title={`${meal.strMeal} - cooking video`}
                      frameBorder="0" allowFullScreen style={{ display: "block" }} />
                  </div>
                </>
              )}

              {meal.strSource && (
                <a href={meal.strSource} target="_blank" rel="noreferrer noopener"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--amber)", fontSize: 14, textDecoration: "none", fontWeight: 600, borderBottom: "1px solid var(--amber)", paddingBottom: 1 }}>
                  View full recipe on TheMealDB ↗
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ emoji, title }: { emoji: string; title: string }) {
  return (
    <h3 className="font-display" style={{ fontSize: 19, fontWeight: 700, color: "var(--brown)", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
      <span>{emoji}</span> {title}
    </h3>
  );
}