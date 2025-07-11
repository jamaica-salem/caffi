import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function ProjectProgressCard() {
  const data = [
    { name: 'Completed', value: 41 },
    { name: 'In Progress', value: 35 },
    { name: 'Pending', value: 24 },
  ];

  const COLORS = {
    'Completed': '#226440',
    'In Progress': '#4C9B74',
    'Pending': '#A4D8B5',
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const completed = data.find(item => item.name === 'Completed')?.value || 0;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="bg-white rounded-xl p-6 shadow border flex flex-col h-full">
      <h3 className="text-primary font-semibold text-lg mb-4">Project Progress</h3>

      {/* Chart with Centered Percentage */}
      <div className="relative flex items-center justify-center mb-2">  
        <ResponsiveContainer width="100%" height={160}>  
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              innerRadius={60}        
              outerRadius={80}        
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute text-center mt-2">  
          <div className="text-2xl font-bold text-primary">{percentage}%</div> 
          <div className="text-sm text-primary-dark font-medium">Project Ended</div>
        </div>
      </div>

      {/* Legends */}
      <div className="flex justify-around text-sm text-primary-dark font-medium"> 
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="inline-block w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: COLORS[item.name] }}
            />
            <span className="text-primary font-semibold">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
