"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Contact {
  id?: string;
  name?: string;
  no_rumah?: string;
  status_perkawinan?: string;
  pekerjaan?: string;
  status_hubungan_dalam_keluarga?: string;
}
interface Props {
  dataContact?: Contact;
  trigger: React.ReactNode;
  onSubmit: (data: Contact) => void;
}

export default function UserFormModal({ dataContact, trigger, onSubmit }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Contact>({
    name: dataContact?.name || "",
    no_rumah: dataContact?.no_rumah || "",
    status_perkawinan: dataContact?.status_perkawinan || "",
    pekerjaan: dataContact?.pekerjaan || "",
    status_hubungan_dalam_keluarga: dataContact?.status_hubungan_dalam_keluarga || "",
    id: dataContact?.id || "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dataContact ? "Edit Data" : "Tambah Data"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Input
            name="name"
            placeholder="Nama"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            name="no_rumah"
            placeholder="nomor rumah"
            value={form.no_rumah}
            onChange={handleChange}
          />
          <Input
            name="status_perkawinan"
            placeholder="Status Perkawinan"
            value={form.status_perkawinan}
            onChange={handleChange}
          />
          <Input
            name="pekerjaan"
            placeholder="Pekerjaan"
            value={form.pekerjaan}
            onChange={handleChange}
          />
          <Input
            name="status_hubungan_dalam_keluarga"
            placeholder="Status dalam keluarga"
            value={form.status_hubungan_dalam_keluarga}
            onChange={handleChange}
          />

        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            {dataContact ? "Simpan Perubahan" : "Tambah"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
