import type { SalesPerson } from '@/data/salesTeam'

type Layout = 'contact' | 'inline'

type SalesContactCardProps = {
  person: SalesPerson
  layout?: Layout
}

export function SalesContactCard({ person, layout = 'contact' }: SalesContactCardProps) {
  const isContact = layout === 'contact'

  return (
    <div
      className={
        isContact
          ? 'flex gap-5 desktop:gap-10 p-4 bg-white border border-primary/20 rounded desktop:flex-1 desktop:min-h-0 desktop:items-stretch'
          : 'flex gap-5 p-4 bg-white border border-primary/20 rounded'
      }
    >
      <div
        className={
          isContact
            ? 'ml-4 shrink-0 w-[104px] h-[104px] rounded overflow-hidden bg-white desktop:w-40 desktop:h-full desktop:min-h-[7.5rem] desktop:self-stretch'
            : 'ml-4 shrink-0 w-[104px] h-[104px] rounded overflow-hidden bg-white'
        }
      >
        <img
          src={person.image}
          alt=""
          className={
            isContact
              ? 'w-full h-full object-cover object-center desktop:object-contain desktop:object-left'
              : 'w-full h-full object-cover object-center'
          }
        />
      </div>
      <div className="min-w-0 flex flex-col justify-center gap-2 font-body py-0.5 pl-1 desktop:pl-4">
        <div className="flex flex-col gap-2.5">
          <p className="font-medium text-primary">{person.title}</p>
          <p className="font-normal text-primary">{person.name}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-primary/70 mb-0.5">Phone</p>
          <p className="text-sm text-primary/80">
            {person.phones.map((p, i) => (
              <span key={p.tel}>
                {i > 0 && <span className="text-primary/50"> or </span>}
                <a href={`tel:${p.tel}`} className="hover:text-primary transition-colors">
                  {p.display}
                </a>
              </span>
            ))}
          </p>
        </div>
        <div className={isContact ? '' : 'min-w-0 overflow-x-auto'}>
          <p className="text-xs font-medium text-primary/70 mb-0.5">Email</p>
          <a
            href={`mailto:${person.email}`}
            className={
              isContact
                ? 'text-sm text-primary/80 hover:text-primary transition-colors break-all'
                : 'text-sm text-primary/80 hover:text-primary transition-colors whitespace-nowrap inline-block'
            }
          >
            {person.email}
          </a>
        </div>
      </div>
    </div>
  )
}
