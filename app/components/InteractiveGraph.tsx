"use client"

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', temperature: 22, ph: 7.1, nutrients: 85 },
  { name: 'Tue', temperature: 23, ph: 7.2, nutrients: 87 },
  { name: 'Wed', temperature: 24, ph: 7.0, nutrients: 84 },
  { name: 'Thu', temperature: 25, ph: 7.3, nutrients: 86 },
  { name: 'Fri', temperature: 23, ph: 7.1, nutrients: 88 },
  { name: 'Sat', temperature: 22, ph: 7.2, nutrients: 85 },
  { name: 'Sun', temperature: 24, ph: 7.1, nutrients: 87 },
]

export default function InteractiveGraph() {
  const { t } = useTranslation()
  const [metric, setMetric] = useState('temperature')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('trends')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={setMetric} defaultValue={metric}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder={t('selectMetric')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="temperature">{t('temperature')}</SelectItem>
            {/* <SelectItem value="ph">{t('pH')}</SelectItem> */}
            <SelectItem value="nutrients">{t('nutrients')}</SelectItem>
          </SelectContent>
        </Select>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={metric} stroke="#059669" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

