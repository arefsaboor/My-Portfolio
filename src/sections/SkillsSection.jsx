import skillsData from '../data/Skills.json';

function SkillsSection() {
  return (
    <section id="skills" className="py-40 bg-teal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-teal-300 mb-4">
            WHAT I AM ABLE TO DO
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            I have a passion of keeping balance between <br />the beauty of <span className="font-bold">Design</span> and a friendly <span className="font-bold">User-Experience</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-teal-600 mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill.id} className="text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
