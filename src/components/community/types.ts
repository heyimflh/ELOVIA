export interface ChallengeItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  scope: string;
  currentKg: number;
  targetKg: number;
  participantsGroups: number;
  participantsUsers: number;
  daysRemaining: number;
  hoursRemaining: number;
  countdownText: string;
}

export interface LeaderboardGroup {
  id: string;
  rank: number;
  name: string;
  category: 'Kampus' | 'RT/RW' | 'Komunitas' | 'Sekolah';
  verifiedKg: number;
  membersCount: number;
  verifiedTransactions: number;
  recentActivity: string;
  isRecentSwapped?: boolean;
}

