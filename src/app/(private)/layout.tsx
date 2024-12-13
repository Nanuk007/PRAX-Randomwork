import { Guard } from "@/components/Guard";

export default function PrivateLayout({ children }: { children: React.ReactNode; }) {
    return (
        <Guard>
            {children}
        </Guard>
    );
}