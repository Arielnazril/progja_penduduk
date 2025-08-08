"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { createData, createUser, deleteData, deleteUser, fetchData, fetchUsers, updateData, updateUser } from "@/lib/api";
import { Button } from "./ui/button";
import UserFormModal from "./UserFormModal";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import ContactFormModal from "./ContactFormModal";

interface Contact {
  id: number;
  name: string;
  no_rumah: string;
  status_perkawinan: string;
  pekerjaan: string;
  status_hubungan_dalam_keluarga: string;
}

export default function UserTable() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchData().then(setContacts);
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      await deleteData(id, token);
      setContacts((prev) => prev.filter((u) => u.id !== id));
      toast.success("Data berhasil dihapus");
    } catch (err) {
      console.log(err);
      
      toast.error("Gagal menghapus Data");
    }
  };

  const handleUpdate = async (data: any) => {
    const token = localStorage.getItem("token");
    try {
      await updateData(data.id, data, token);
      const updatedUsers = await fetchData();
      setContacts(updatedUsers);

      toast.success("User berhasil diupdate");
    } catch (err) {
      toast.error("Gagal mengupdate user");
    }
  };

  const handleCreate = async (data: any) => {
    const token = localStorage.getItem("token");
    try {
      await createData(data, token);
      const updated = await fetchData();
      setContacts(updated);
      toast.success("Data berhasil ditambahkan");
    } catch (err) {
      toast.error("Gagal menambahkan Data");
    }
  };

  return (
    <div className="rounded-md border p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Daftar Warga</h2>
        <ContactFormModal
          onSubmit={handleCreate}
          trigger={<Button>+ Tambah</Button>}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>No Rumah</TableHead>
            <TableHead>Status Perkawinan</TableHead>
            <TableHead>Pekerjaan</TableHead>
            <TableHead>Status Hubungan Dalam Keluarga</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact, index) => (
            <TableRow key={contact.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.no_rumah}</TableCell>
              <TableCell>{contact.status_perkawinan}</TableCell>
              <TableCell>{contact.pekerjaan}</TableCell>
              <TableCell>{contact.status_hubungan_dalam_keluarga}</TableCell>
              <TableCell className="text-right space-x-2">
                <ContactFormModal
                  dataContact={contact}
                  onSubmit={handleUpdate}
                  trigger={
                    <Button size="sm" variant="outline" className="bg-sky-400">
                      Edit
                    </Button>
                  }
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      Hapus
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Yakin ingin menghapus data ini?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Tindakan ini tidak bisa dibatalkan. Data akan hilang
                        permanen.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(contact.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Ya, Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
