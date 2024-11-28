import Goal from '@/components/Profile/ProfileGoals/components/Goal';
import { Goal as GoalType } from '@/services/api/Profile/ProfileGoals/type';


interface GoalListProps {
  goals: GoalType[];
  isCurrentUser: boolean;
}

const GoalList = ({ goals, isCurrentUser }: GoalListProps) => {
  return (
    <div className="flex flex-col gap-[20px]">
      {goals.map((goal, index) => (
        <Goal
          key={goal._id}
          goal={goal}
          isCurrentUser={isCurrentUser}
        />
      ))}
    </div>
  );
};

export default GoalList; 