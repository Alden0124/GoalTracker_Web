import Goal from '../Goal';

interface GoalItem {
  title: string;
  progress: number;
  description: string;
}

interface GoalListProps {
  goals: GoalItem[];
}

const GoalList = ({ goals }: GoalListProps) => {
  return (
    <div className="flex flex-col gap-[20px]">
      {goals.map((goal, index) => (
        <Goal
          key={index}
          title={goal.title}
          progress={goal.progress}
          description={goal.description}
        />
      ))}
    </div>
  );
};

export default GoalList; 