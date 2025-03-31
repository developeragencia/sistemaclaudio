
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  user: {
    name: string;
    role: string;
  };
  type: 'info' | 'success' | 'warning' | 'error';
}

interface RecentActivitiesProps {
  activities: Activity[];
  className?: string;
}

const getTypeStyles = (type: Activity['type']) => {
  switch (type) {
    case 'success':
      return 'bg-green-100 text-green-700';
    case 'warning':
      return 'bg-yellow-100 text-yellow-700';
    case 'error':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-blue-100 text-blue-700';
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities, className }) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle>Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <div className="flex gap-4">
                <Avatar className={`h-8 w-8 ${getTypeStyles(activity.type)}`}>
                  <AvatarFallback className="text-xs">
                    {getInitials(activity.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">por {activity.user.name} • {activity.user.role}</p>
                </div>
              </div>
              {index < activities.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
