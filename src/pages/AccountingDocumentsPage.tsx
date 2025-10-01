import React, { useState } from 'react';
import AccountingDocumentForm from '@/components/AccountingDocumentForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DocumentSummary {
  id: string;
  voucherNumber: string;
  date: string;
  description: string;
  status: string;
}

const mockDocuments: DocumentSummary[] = [
  { id: '1', voucherNumber: 'V-2024-001', date: '2024/06/01', description: 'سند خرید کالا', status: 'approved' },
  { id: '2', voucherNumber: 'V-2024-002', date: '2024/06/05', description: 'سند فروش کالا', status: 'draft' },
];

const AccountingDocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentSummary[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filteredDocuments = documents.filter(doc =>
    doc.voucherNumber.includes(searchTerm) ||
    doc.description.includes(searchTerm) ||
    doc.status.includes(searchTerm)
  );

  const handleAddNew = () => {
    setSelectedDocumentId(null);
    setShowForm(true);
  };

  const handleEdit = (id: string) => {
    setSelectedDocumentId(id);
    setShowForm(true);
  };

  const handleBackToList = () => {
    setShowForm(false);
    setSelectedDocumentId(null);
  };

  return (
    <div className="p-6" dir="rtl">
      {!showForm ? (
        <>
          <Card className="mb-6">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>مدیریت اسناد حسابداری</CardTitle>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="جستجو..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border rounded px-3 py-1 text-sm"
                />
                <Button onClick={handleAddNew}>ایجاد سند جدید</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>شماره سند</TableHead>
                    <TableHead>تاریخ</TableHead>
                    <TableHead>شرح</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map(doc => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.voucherNumber}</TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell>{doc.description}</TableCell>
                      <TableCell>{doc.status === 'approved' ? 'تایید شده' : 'پیش‌نویس'}</TableCell>
                      <TableCell>
                        <Button size="sm" onClick={() => handleEdit(doc.id)}>ویرایش</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredDocuments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        سندی یافت نشد
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <Button variant="outline" onClick={handleBackToList} className="mb-4">
            بازگشت به لیست اسناد
          </Button>
          <AccountingDocumentForm />
        </>
      )}
    </div>
  );
};

export default AccountingDocumentsPage;
