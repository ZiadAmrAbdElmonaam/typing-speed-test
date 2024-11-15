export function InstructionCards() {
  const instructions = [
    {
      icon: "https://api.iconify.design/solar:keyboard-outline.svg?color=%239333ea",
      title: "Type Quickly",
      description: "In the text box, type as quickly and accurately as possible. Write continuously until time is up"
    },
    {
      icon: "https://api.iconify.design/oi/timer.svg?color=%239333ea",
      title: "Watch the Timer",
      description: "You'll see a countdown in the top corner. This will let you know how much time you have left"
    },
    {
      icon: "https://api.iconify.design/solar:check-circle-outline.svg?color=%239333ea",
      title: "Get Results",
      description: "When the time is up, your responses will be saved automatically. You don't need to do anything else"
    }
  ]

  return (
    <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
      {instructions.map((instruction, index) => (
        <div key={index} className="p-6 rounded-lg bg-white shadow-lg">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <img 
              src={instruction.icon}
              alt={instruction.title}
              width="48"
              height="48"
              className="w-12 h-12"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">{instruction.title}</h3>
          <p className="text-gray-600 text-sm">{instruction.description}</p>
        </div>
      ))}
    </div>
  )
} 