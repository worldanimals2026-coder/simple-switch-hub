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
        "w-full h-14 bg-muted/50 flex items-center justify-center rounded-lg border border-dashed border-muted-foreground/30",
        position === "top" ? "mb-4" : "mt-4",
        className
      )}
    >
      <p className="text-xs text-muted-foreground">
        📢 Ad Space - AdMob Banner
      </p>
    </div>
  );
};

export default AdBanner;
