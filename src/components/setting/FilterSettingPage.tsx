import Button from "../ui/button/Button";
import { CiSettings } from "react-icons/ci";
import { DollarLineIcon } from "../../icons";
import { Page } from "../../pages/SettingPage/SettingPage";
import { FaRegUser } from "react-icons/fa";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { CiShop } from "react-icons/ci";

type Props = {
  setPage: (page: Page) => void;
  page: Page;
};
export default function FilterSettingPage({ setPage, page }: Props) {
  return (
    <div className="mx-auto w-full flex justify-start gap-3">
      <Button
        size="md"
        variant={page === "pengaturanUmum" ? "primary" : "outline"}
        className="flex-1/2"
        startIcon={<CiSettings className="size-5" />}
        onClick={() => setPage("pengaturanUmum")}>
        Pengaturan Umum
      </Button>
      <Button
        size="md"
        variant={page === "payment" ? "primary" : "outline"}
        className="flex-1/2"
        startIcon={<DollarLineIcon className="size-5" />}
        onClick={() => setPage("payment")}>
        Payment
      </Button>
      <Button
        size="md"
        variant={page === "asalPengiriman" ? "primary" : "outline"}
        className="flex-1/2"
        startIcon={<LiaPeopleCarrySolid className="size-5" />}
        onClick={() => setPage("asalPengiriman")}>
        Asal Pengiriman
      </Button>
      <Button
        size="md"
        variant={page === "pengaturanAkun" ? "primary" : "outline"}
        className="flex-1/2"
        startIcon={<FaRegUser className="size-5" />}
        onClick={() => setPage("pengaturanAkun")}>
        Pengaturan Akun
      </Button>
      <Button
        size="md"
        variant={page === "selesChannel" ? "primary" : "outline"}
        className="flex-1/2"
        startIcon={<CiShop className="size-5" />}
        onClick={() => setPage("selesChannel")}>
        Shales Channel
      </Button>
    </div>
  );
}
