import { cn } from "@/lib/utils";

interface AdBannerProps {
  className?: string;
  position: "top" | "bottom";
}

const AdBanner = ({ className, position }: AdBannerProps) => {
  // This is a placeholder for AdMob integration
  // In production, replace this with actual AdMob banner
  return (
    <div
      className={cn(
        "w-full h-12 bg-muted/50 flex items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 flex-shrink-0",
        position === "top" ? "mb-2" : "mt-2",
        className
      )}
    >
      <p className="text-xs text-muted-foreground">
        📢 Ad Space
      </p>
    </div>
  );
};

export default AdBanner;
