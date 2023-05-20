import "./registerCard.css"

const RegisterCard = (task: any) => {

    const headerTitle = [
        { title: "Id Risk", description: task.risk.id, capital: true, range: 0  }
    ]

    const headerItems = [
        { title: "Impact", description: task.risk.impact.name, capital: true, range: task.risk.impact.value+1  },
        { title: "Probability", description: task.risk.probability.name, capital: true, range: task.risk.probability.value+1  },
        { title: "Priority", description: task.risk.priority.name, capital: true, range: task.risk.priority.value+1  },
    ]

    const headerBody = [
        { title: "Risk description", description: task.risk.riskDescription},
        { title: "Impact description", description: task.risk.impactDescription},
        { title: "Response plan", description:task.risk.responsePlan},
        { title: "Owner", description:task.risk.owner},
        { title: "Point", description: task.risk.points}
    ]

    return (
        
        
            <div className="register__card">
            <section className="card__header">
                { headerTitle.map(item => <div className={`card__item ${item.capital && "capital"} range-${item.range}`}> <div>{item.title}</div> <div>{item.description}</div> </div> ) }
            </section>
          
            <section className="card__header">
                { headerItems.map(item => <div className={`card__item ${item.capital && "capital"} range-${item.range}`}> <div>{item.title}</div> <div>{item.description}</div> </div> ) }
            </section>
            <hr/>
            <section className="card__body">
                { headerBody.map(item =>  <div className={`card__item`}> <div>{item.title}</div> <div>{item.description}</div> </div> ) }
            </section>
        </div>
       
    )
}

export default RegisterCard