'use client';

import React, { useState } from 'react';
import { DashContentTable, TableTd, TableTdMain, TableThead, TableTr } from "@/components/DashCrudContent";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Vaccine {
  id: number;
  name: string;
  date: string;
  description: string;
}

export default function AnimalVaccines() {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [form, setForm] = useState<Omit<Vaccine, 'id'>>({
    name: '',
    date: '',
    description: '',
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreateModal = () => {
    setForm({ name: '', date: '', description: '' });
    setEditId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (vaccine: Vaccine) => {
    setForm({ name: vaccine.name, date: vaccine.date, description: vaccine.description });
    setEditId(vaccine.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm({ name: '', date: '', description: '' });
    setEditId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (editId !== null) {
      setVaccines((prev) =>
        prev.map((v) => (v.id === editId ? { ...v, ...form } : v))
      );
    } else {
      setVaccines((prev) => [
        ...prev,
        {
          id: prev.length ? prev[prev.length - 1].id + 1 : 1,
          ...form,
        },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setVaccines((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Animal Vaccines</h2>
        <button
          onClick={openCreateModal}
          className="bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary  px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-1"
        >
          <Plus size={16} />
          Add Vaccine
        </button>
      </div>

      <DashContentTable>
        <TableThead list={['Id', 'Name', 'Date', 'Description', 'Settings']} />
        <tbody>
          {vaccines.map((vaccine) => (
            <TableTr key={vaccine.id}>
              <TableTdMain value={vaccine.id.toString()} />
              <TableTd>{vaccine.name}</TableTd>
              <TableTd>{vaccine.date}</TableTd>
              <TableTd>{vaccine.description}</TableTd>
              <TableTd>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEditModal(vaccine)}>
                    <Pencil className="text-green-600 dark:text-green-400" size={16} />
                  </button>
                  <button onClick={() => handleDelete(vaccine.id)}>
                    <Trash2 className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300" size={16} />
                  </button>
                </div>
              </TableTd>
            </TableTr>
          ))}
        </tbody>
      </DashContentTable>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/35 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">{editId ? 'Edit Vaccine' : 'Add New Vaccine'}</h3>

            <div className="grid grid-cols-1 gap-3">
              <input
                className="p-2 border rounded bg-transparent"
                type="text"
                name="name"
                placeholder="Vaccine Name"
                value={form.name}
                onChange={handleInputChange}
              />
              <input
                className="p-2 border rounded bg-transparent"
                type="date"
                name="date"
                value={form.date}
                onChange={handleInputChange}
              />
              <textarea
                className="p-2 border rounded bg-transparent"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleInputChange}
              />
              <button
                onClick={handleSubmit}
                className="bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary  px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {editId ? 'Update Vaccine' : 'Create Vaccine'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
