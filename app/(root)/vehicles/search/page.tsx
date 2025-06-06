import Searchbar from "@/components/ui/searchbar";

export default function SearchDriver() {
     return (
          <div className="mx-auto my-[100px] max-w-[500px] p-2">
               <Searchbar placeholder="Enter vehicle plate" variant="primary" />
          </div>
     );
}
