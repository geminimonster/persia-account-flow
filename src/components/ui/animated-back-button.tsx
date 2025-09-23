import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnimatedBackButtonProps {
  onClick: () => void;
  text?: string;
}

export function AnimatedBackButton({ onClick, text = "بازگشت" }: AnimatedBackButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="group mb-6 flex items-center gap-2 hover:shadow-md transition-all duration-300 hover:-translate-x-1"
    >
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      <span className="font-medium">{text}</span>
    </Button>
  );
}