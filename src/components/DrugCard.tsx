import React from 'react';
import { Pill, Calendar, User, FileText } from 'lucide-react';

interface DrugData {
  drug_name: string;
  sponsor_name: string;
  submission_date: string;
  application_number: string;
}

interface DrugCardProps {
  data: DrugData;
  language: 'en' | 'zh';
}

export default function DrugCard({ data, language }: DrugCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Pill className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{data.drug_name}</h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span>{language === 'en' ? 'Sponsor: ' : '申办方：'}{data.sponsor_name}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{language === 'en' ? 'Submitted: ' : '提交日期：'}{data.submission_date}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FileText className="w-4 h-4 mr-2" />
              <span>{language === 'en' ? 'Application: ' : '申请编号：'}{data.application_number}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}