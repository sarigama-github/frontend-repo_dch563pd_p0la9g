import React from 'react';
import { Gift, Crown, Sparkles } from 'lucide-react';

const tiers = [
  { id: 'bronze', name: 'Bronze', threshold: 0, perk: '1x points', color: 'bg-amber-100 text-amber-800' },
  { id: 'silver', name: 'Silver', threshold: 250, perk: '1.25x points', color: 'bg-slate-200 text-slate-800' },
  { id: 'gold', name: 'Gold', threshold: 600, perk: '1.5x points', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'platinum', name: 'Platinum', threshold: 1200, perk: '2x points', color: 'bg-indigo-100 text-indigo-800' },
];

const LoyaltyPanel = ({ points, history }) => {
  const tier = React.useMemo(() => {
    return [...tiers].reverse().find(t => points >= t.threshold) || tiers[0];
  }, [points]);

  const nextTier = React.useMemo(() => {
    return tiers.find(t => t.threshold > tier.threshold);
  }, [tier]);

  const progress = nextTier ? Math.min(100, Math.round(((points - tier.threshold) / (nextTier.threshold - tier.threshold)) * 100)) : 100;

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Crown className="h-6 w-6 text-amber-500" /> Loyalty Program
        </h2>
        <p className="text-slate-600">Earn points on every purchase and unlock exclusive perks.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Current tier</div>
              <div className={`mt-1 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${tier.color}`}>
                <Sparkles className="h-4 w-4" /> {tier.name}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500">Total points</div>
              <div className="text-2xl font-bold text-slate-800">{points}</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
              <span>Progress to {nextTier ? nextTier.name : 'max tier'}</span>
              {nextTier && <span>{Math.max(0, nextTier.threshold - points)} pts to go</span>}
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full bg-teal-600" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">Recent activity</h3>
            <div className="space-y-3">
              {history.length === 0 && (
                <div className="text-sm text-slate-500">No activity yet. Start shopping to earn points!</div>
              )}
              {history.map((h, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                  <div>
                    <div className="text-sm font-medium text-slate-800">{h.title}</div>
                    <div className="text-xs text-slate-500">{new Date(h.date).toLocaleDateString()}</div>
                  </div>
                  <div className="text-sm font-semibold text-teal-700">+{h.points} pts</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Tiers & perks</h3>
          <div className="mt-3 space-y-2">
            {tiers.map(t => (
              <div key={t.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <div className="text-sm font-medium text-slate-800">{t.name}</div>
                <div className="text-xs text-slate-500">{t.perk} • {t.threshold} pts</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-amber-50 p-4 text-amber-800">
            <div className="flex items-center gap-2 font-semibold"><Gift className="h-4 w-4" /> Tip</div>
            <p className="mt-1 text-sm">Earn double points on orders over $100 every weekend. Members-only drops monthly.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltyPanel;
