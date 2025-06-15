import Image from "next/image";
import type { Tournament } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, DollarSign, ShieldCheck, ShieldAlert, Shield, Info } from "lucide-react";
import { format, parseISO } from "date-fns";

interface TournamentDetailHeaderProps {
  tournament: Tournament;
}

export function TournamentDetailHeader({ tournament }: TournamentDetailHeaderProps) {
  
  const getStatusPillClasses = (status: Tournament['status']) => {
    switch (status) {
      case 'Upcoming': return "bg-blue-100 text-blue-700 border-blue-300";
      case 'Live': return "bg-green-100 text-green-700 border-green-300";
      case 'Finished': return "bg-gray-100 text-gray-700 border-gray-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getRiskPillClasses = (riskLevel?: string) => {
    if (!riskLevel) return "bg-gray-100 text-gray-700 border-gray-300";
    switch (riskLevel) {
      case 'Low': return "bg-green-100 text-green-700 border-green-300";
      case 'Medium': return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case 'High': return "bg-red-100 text-red-700 border-red-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };
  
  const RiskIcon = tournament.aiRiskAssessment?.riskLevel === 'Low' ? ShieldCheck :
                   tournament.aiRiskAssessment?.riskLevel === 'Medium' ? Shield :
                   tournament.aiRiskAssessment?.riskLevel === 'High' ? ShieldAlert : Info;


  return (
    <div className="mb-8">
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mb-6">
        {tournament.imageUrl ? (
          <Image
            src={tournament.imageUrl}
            alt={tournament.name}
            layout="fill"
            objectFit="cover"
            priority
            data-ai-hint="poker game"
          />
        ) : (
          <div className="bg-muted w-full h-full flex items-center justify-center">
            <TrophyIcon className="w-24 h-24 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-white shadow-text">
            {tournament.name}
          </h1>
          <p className="text-lg text-gray-200 shadow-text">{tournament.platform}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
        <InfoPill Icon={CalendarDays} label="Starts" value={format(parseISO(tournament.startTime), "MMM d, yyyy 'at' p")} />
        <InfoPill Icon={DollarSign} label="Buy-in" value={`$${tournament.buyIn.toLocaleString()}`} />
        <InfoPill Icon={DollarSign} label="Prize Pool" value={`$${tournament.guaranteedPrizePool.toLocaleString()} GTD`} />
        {tournament.participants && (
          <InfoPill Icon={Users} label="Players" value={`${tournament.participants.current}${tournament.participants.max ? ` / ${tournament.participants.max}` : ''}`} />
        )}
        <div className={`flex items-center space-x-2 p-3 rounded-lg border ${getStatusPillClasses(tournament.status)}`}>
          <span className="font-medium">{tournament.status}</span>
        </div>
        {tournament.aiRiskAssessment?.riskLevel && (
           <div className={`flex items-center space-x-2 p-3 rounded-lg border ${getRiskPillClasses(tournament.aiRiskAssessment.riskLevel)}`}>
            <RiskIcon className="h-5 w-5" />
            <span className="font-medium">AI Risk: {tournament.aiRiskAssessment.riskLevel}</span>
          </div>
        )}
      </div>

      {tournament.description && (
        <p className="mt-6 text-muted-foreground">{tournament.description}</p>
      )}
    </div>
  );
}

interface InfoPillProps {
  Icon: React.ElementType;
  label: string;
  value: string;
}

function InfoPill({ Icon, label, value }: InfoPillProps) {
  return (
    <div className="flex items-center space-x-2 p-3 bg-card border rounded-lg shadow-sm">
      <Icon className="h-5 w-5 text-primary" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function TrophyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}
