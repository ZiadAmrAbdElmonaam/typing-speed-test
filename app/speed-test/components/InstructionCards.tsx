export function InstructionCards() {
  const instructions = [
    {
      title: "Type Quickly",
      description: "In the text box, type as quickly and accurately as possible. Write continuously until time is up",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgOEgxNFY1QzE0IDQuNDQ3NzIgMTMuNTUyMyA0IDEzIDRIMTFDMTAuNDQ3NyA0IDEwIDQuNDQ3NzIgMTAgNVY4SDRDMi44OTU0MyA4IDIgOC44OTU0MyAyIDEwVjE4QzIgMTkuMTA0NiAyLjg5NTQzIDIwIDQgMjBIMjBDMjEuMTA0NiAyMCAyMiAxOS4xMDQ2IDIyIDE4VjEwQzIyIDguODk1NDMgMjEuMTA0NiA4IDIwIDhaIiBzdHJva2U9IiM3MDAxRDMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+"
    },
    {
      title: "Watch the Timer",
      description: "You'll see a countdown in the top corner. This will let you know how much time you have left",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgNkMyLjk5OTk5IDYgMi45OTk5OSAxOCAxMiAxOEMyMSAxOCAyMSA2IDEyIDZaIiBzdHJva2U9IiM3MDAxRDMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTEyIDEwVjE0IiBzdHJva2U9IiM3MDAxRDMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+"
    },
    {
      title: "Get Results",
      description: "When the time is up, your responses will be saved automatically. You don't need to do anything else",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgNkw5IDE3TDQgMTIiIHN0cm9rZT0iIzcwMDFEMyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4="
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {instructions.map((instruction, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 flex items-center justify-center">
            <img 
              src={instruction.icon}
              alt={instruction.title}
              className="w-12 h-12 dark:opacity-90"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            {instruction.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {instruction.description}
          </p>
        </div>
      ))}
    </div>
  )
} 