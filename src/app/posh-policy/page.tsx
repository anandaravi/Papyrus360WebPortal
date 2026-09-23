import { Eye, ShieldCheck, Mail } from 'lucide-react';
import { pageMeta } from '@/lib/seo';
import { SITE } from '@/lib/constants';

export const metadata = pageMeta({
  title: 'POSH Policy — Prevention of Sexual Harassment at Workplace',
  path: '/posh-policy',
  description:
    'Netique Infotech Pvt Ltd. (Papyrus360) Policy on Prevention of Sexual Harassment at Workplace, as required under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.',
});

const POSH_PDF = '/documents/posh-policy.pdf';

const IC_MEMBERS = [
  { name: 'Ms. Suguna GW', role: 'External Committee Member' },
  { name: 'Mrs. Dhanalakshmi K', role: 'Presiding Officer' },
  { name: 'Mrs. Sindhu S', role: 'Member' },
  { name: 'Mr. Ragesh Kanavalkadan', role: 'Member' },
];

const CORRECTIVE_ACTIONS = [
  'Formal apology',
  'No monetary settlement shall be made as a basis of conciliation',
  'Counseling',
  "Written warning to the perpetrator, kept in the employee's file",
  'Change of work assignment / transfer for either the perpetrator or the victim',
  "Restraint from reporting on the complainant's work performance or appraisals",
  'Suspension or termination of services of the employee found guilty',
];

const IC_RECOMMENDATIONS = [
  'Transfer of the respondent',
  'Direct the respondent to undergo training or counselling',
  'Direct the respondent to provide a written apology to the complainant',
  "Verbal or written warning, noted in the respondent's employment record",
  'Withhold increment or bonus (in full or part)',
  'Withhold promotion',
  'Direct termination or suspension of employment of the respondent',
  'Any other appropriate disciplinary action',
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-lg font-bold tracking-tight text-amber-400 mb-3">{title}</h2>
      <div className="space-y-3 text-sm text-text-2 leading-relaxed">{children}</div>
    </section>
  );
}

export default function PoshPolicyPage() {
  return (
    <>
      {/* Hero */}
      <div className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Statutory Compliance
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            POSH Policy
          </h1>
          <p className="text-text-2 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            Policy on Prevention of Sexual Harassment at Workplace, published in accordance with
            the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal)
            Act, 2013 (&ldquo;POSH Act&rdquo;).
          </p>
          <a
            href="#original-pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors duration-200"
          >
            <Eye size={16} />
            View Original PDF
          </a>
        </div>
      </div>

      {/* Company letterhead block */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="rounded-xl border border-border bg-surface-2 p-5 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-text-3">
          <span className="text-foreground font-medium">{SITE.company}</span>
          <span>#31, Sri Ram Mansion, 6th Cross, C.T. Bed Road, Banashankari 2nd Stage, Bengaluru - 560070, Karnataka, India</span>
          <span>GSTIN: 29AABCN9761D1Z8</span>
          <span>CIN: {SITE.cin}</span>
        </div>
      </div>

      {/* Embedded viewer — read-only, no download affordance */}
      <div id="original-pdf" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-10 scroll-mt-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
          Original Document
        </p>
        <div className="rounded-xl border border-border overflow-hidden bg-surface-2" style={{ height: 780 }}>
          <iframe
            src={`${POSH_PDF}#toolbar=0&navpanes=0`}
            title="POSH Policy — original PDF"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 md:py-16 space-y-12">
        <Section id="commitment" title="I. Commitment">
          <p>
            Our Company is committed to providing a work environment that ensures every employee
            is treated with dignity and respect and affords equitable treatment. The Company is
            also committed to promoting a work environment that is conducive to the professional
            growth of its employees and encourages equality of opportunity. The Company will not
            tolerate any form of sexual harassment and is committed to take all necessary steps to
            ensure that its employees are not subjected to any form of harassment.
          </p>
        </Section>

        <Section id="scope" title="II. Scope">
          <p>
            This policy applies to all categories of employees of the Company, including permanent
            management and workmen, temporaries, trainees and employees on contract at their
            workplace or at the company&apos;s stores or at client sites. In the event of a sexual
            harassment allegation against a contract worker, the Company will work with the
            employer of the alleged offender to decide how the matter should be handled. This
            policy is applicable not only on the Company&apos;s premises, but also in situations
            where persons covered by this policy have opportunities to interact on a work-related
            basis such as while travelling, in off-site events or other third-party premises. Any
            form of sexual harassment engaged in by the Company&apos;s employees, clients, vendors,
            or other business associates in the Company&apos;s premises or during the course of the
            employee&apos;s employment for the Company, shall not be tolerated.
          </p>
          <p className="text-foreground font-medium mt-4">The workplace includes:</p>
          <ol className="list-decimal list-outside pl-5 space-y-1.5">
            <li>All offices or other premises where the Company&apos;s business is conducted.</li>
            <li>All company-related activities performed at any other site away from the Company&apos;s premises.</li>
            <li>Any social, business or other functions where the conduct or comments may have an adverse impact on the workplace or workplace relations.</li>
            <li>Tour buses/cabs/any vehicles of the company, hotels, airports, client sites, remote travel, and virtual platforms (e.g., booking apps or video calls). Any place visited during employment.</li>
          </ol>
        </Section>

        <Section id="definition" title="III. Definition of Sexual Harassment">
          <p>
            Sexual harassment may be one or a series of incidents involving unsolicited and
            unwelcome sexual advances, requests for sexual favors, or any other verbal or physical
            conduct of sexual nature.
          </p>
          <p className="text-foreground font-medium mt-4">Sexual harassment at the workplace includes:</p>
          <ol className="list-decimal list-outside pl-5 space-y-1.5">
            <li>Unwelcome sexual advances (verbal, nonverbal, written or physical),</li>
            <li>Demand or request for sexual favors,</li>
            <li>Any other type of sexually oriented conduct,</li>
            <li>Verbal abuse or &ldquo;joking&rdquo; that is sex-oriented,</li>
            <li>
              Making sexually colored remarks, jokes, letters, phone calls, e-mails, gestures,
              lurid stares, physical contact, molestation, stalking, sounds, display of pictures,
              signs, verbal or non-verbal communication which offends the individual&apos;s
              sensibilities and affects the individual&apos;s performance; or
            </li>
            <li>Showing pornography; or</li>
            <li>
              Any conduct that has the purpose or the effect of interfering with an individual&apos;s
              work performance or creating an intimidating, hostile or offensive work environment
              and/or submission to such conduct is either an explicit or implicit term or condition
              of employment and/or submission or rejection of the conduct is used as a basis for
              making employment-related decisions.
            </li>
          </ol>
          <p className="mt-4">
            The following circumstances, among other circumstances, if it occurs or is present in
            relation to or connected with any act or behavior of sexual harassment may amount to
            sexual harassment:
          </p>
          <ol className="list-decimal list-outside pl-5 space-y-1.5">
            <li>Implied or explicit promise of preferential treatment in employment; or</li>
            <li>Implied or explicit threat of detrimental treatment in employment; or</li>
            <li>Implied or explicit threat about present or future employment status; or</li>
            <li>Interference with work or creating intimidating or offensive or hostile working environment; or</li>
            <li>Humiliating treatment likely to affect health or safety.</li>
          </ol>
          <p className="mt-4">
            It is unlawful for males to sexually harass females or other males, and for females to
            sexually harass males or other females. Sexual harassment in the workplace is
            prohibited whether it involves co-worker harassment, harassment by a manager,
            applicants for employment, contract workers, contractors, customers, vendors or any
            person doing business with or for the Company.
          </p>
        </Section>

        <Section id="responsibilities" title="IV. Responsibilities Regarding Sexual Harassment">
          <p>
            All employees of the Company have a personal responsibility to ensure that their
            behavior is not contrary to this policy.
          </p>
          <p>
            All employees are encouraged to reinforce the maintenance of a work environment free
            from sexual harassment.
          </p>
        </Section>

        <Section id="complaint-mechanism" title="V. Complaint Mechanism">
          <p>
            An appropriate complaint mechanism in the form of &ldquo;Internal Committee&rdquo;
            (IC) has been created in the Company for time-bound redressal of the complaint made by
            the victim.
          </p>
        </Section>

        <Section id="internal-committee" title="VI. Internal Committee">
          <p>
            The Company has instituted an Internal Committee for redressal of sexual harassment
            complaints (made by the victim) across its offices and for ensuring time bound
            treatment of such complaints. Initially, and till further notice, the IC will comprise
            of the following four members, of which at least two members will be of the same
            gender as that of the complainant:
          </p>
          <div className="not-prose rounded-xl border border-border bg-surface-2 overflow-hidden mt-4">
            <table className="w-full text-sm">
              <tbody>
                {IC_MEMBERS.map((m, i) => (
                  <tr key={m.name} className={i !== IC_MEMBERS.length - 1 ? 'border-b border-border' : ''}>
                    <td className="px-4 py-3 text-foreground font-medium whitespace-nowrap">{m.name}</td>
                    <td className="px-4 py-3 text-text-3">{m.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-foreground font-medium mt-4">The Committee is responsible for:</p>
          <ul className="list-disc list-outside pl-5 space-y-1.5">
            <li>Investigating every formal written complaint of sexual harassment</li>
            <li>Taking appropriate remedial measures to respond to any substantiated allegations of sexual harassment</li>
            <li>Discouraging and preventing employment-related sexual harassment</li>
          </ul>
        </Section>

        <Section id="procedure" title="VII. Procedures for Resolution, Settlement or Prosecution">
          <p>
            The Company is committed to providing a supportive environment to resolve concerns of
            sexual harassment as under:
          </p>

          <p className="text-foreground font-medium mt-4">A. Informal Resolution Options</p>
          <p>
            When an incident of sexual harassment occurs, the aggrieved person / victim of such
            conduct can communicate their disapproval and objections immediately to the respondent
            / harasser and request the respondent/harasser to behave decently.
          </p>
          <p>
            If the harassment does not stop, or if the aggrieved person / victim is not comfortable
            addressing the respondent / harasser directly, the aggrieved person / victim can bring
            their concern to the attention of the Committee for redressal of their grievances. The
            Committee will thereafter provide advice or extend support as requested and will
            undertake prompt investigation to resolve the matter.
          </p>

          <p className="text-foreground font-medium mt-4">B. Complaints</p>
          <ol className="list-decimal list-outside pl-5 space-y-2">
            <li>
              An employee with a harassment concern, who is not comfortable with the informal
              resolution options or has exhausted such options, may make a formal complaint to the
              Presiding Officer of the Committee constituted by the Management. The complaint
              shall be in writing and can be in the form of a letter, preferably within 15 days
              from the date of occurrence of the alleged incident, sent in a sealed envelope.
              Alternately, the employee can send the complaint by email. The employee is required
              to disclose their name, department, division and location they are working in, to
              enable the Presiding Officer to contact them and take the matter forward.
            </li>
            <li>
              The Presiding Officer of the Committee will proceed to determine whether the
              allegations (assuming them to be true only for the purpose of this determination)
              made in the complaint fall under the purview of sexual harassment, preferably within
              30 days from receipt of the complaint. If the allegation does not fall under the
              purview of sexual harassment, the Presiding Officer will record this finding with
              reasons and communicate the same to the complainant.
            </li>
            <li>
              If the Presiding Officer of the Committee determines that the allegations constitute
              an act of sexual harassment, she will proceed to investigate the allegation with the
              assistance of the Committee.
            </li>
            <li>
              Where such conduct, on the part of the accused, amounts to a specific offence under
              the law, the Company shall initiate appropriate action in accordance with law by
              making a complaint with the appropriate authority.
            </li>
            <li>
              The Committee shall conduct such investigations in a timely manner and shall submit
              a written report containing the findings and recommendations to the Managing
              Director of the Company as soon as practically possible and in any case, not later
              than 90 days from the date of receipt of the complaint. The Managing Director will
              ensure corrective action on the recommendations of the Committee and keep the
              complainant informed of the same.
            </li>
          </ol>

          <p className="text-foreground font-medium mt-4">Corrective action may include any of the following:</p>
          <ul className="list-disc list-outside pl-5 space-y-1.5">
            {CORRECTIVE_ACTIONS.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <p className="mt-4">
            The Internal Committee may also recommend the Company to suspend the respondent or
            grant leave to the respondent, during the pendency of the inquiry if the circumstances
            so merit.
          </p>

          <p className="text-foreground font-medium mt-4">Internal Committee&apos;s recommendations:</p>
          <p>
            During the inquiry proceeding, if the respondent is found guilty of sexual harassment,
            depending on the severity of the offence, the Internal Committee may make any of the
            following recommendations to the Head of HR Operations, including but not limited to:
          </p>
          <ul className="list-disc list-outside pl-5 space-y-1.5">
            {IC_RECOMMENDATIONS.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <p className="mt-4">
            The management shall provide all necessary assistance for the purpose of ensuring
            full, effective and speedy implementation of this policy.
          </p>
          <p>
            Where sexual harassment occurs as a result of an act or omission by any third party or
            outsider, the Company shall take all steps necessary and reasonable to assist the
            affected person in terms of support and preventive action.
          </p>
          <p>
            If the complainant desires to take criminal action against the respondent, there shall
            be no objection by the Internal Committee and the Company. In such an event, the
            Company will attempt to provide all reasonable assistance to the complainant.
          </p>
          <p>
            In case the complaint is found to be false, the complainant shall, if deemed fit, be
            liable for appropriate disciplinary action by the Management, including suspension or
            termination of work.
          </p>
        </Section>

        <Section id="confidentiality" title="VIII. Confidentiality">
          <p>
            The Company understands that it is difficult for the victim to come forward with a
            complaint of sexual harassment and recognizes the victim&apos;s interest in keeping the
            matter confidential. To protect the interests of the victim, the accused person and
            others who may report incidents of sexual harassment, confidentiality will be
            maintained throughout the investigatory process to the extent practicable and
            appropriate under the circumstances.
          </p>
        </Section>

        <Section id="records" title="IX. Access to Reports and Documents">
          <p>
            All records of complaints, including contents of meetings, results of investigations
            and other relevant material will be kept confidential by the Company except where
            disclosure is required under disciplinary or other remedial processes.
          </p>
        </Section>

        <Section id="protection" title="X. Protection to Complainant / Victim">
          <p>
            The Company is committed to ensuring that no employee who brings forward a harassment
            concern is subject to any form of reprisal. Any reprisal will be subject to
            disciplinary action. The Company will ensure that the victim or witnesses are not
            victimized or discriminated against while dealing with complaints of sexual
            harassment. However, anyone who abuses the procedure (for example, by maliciously
            putting forward an allegation knowing it to be untrue) will be subject to disciplinary
            action as in section VII B.6 above.
          </p>
          <p className="text-foreground font-medium mt-4">Retaliation</p>
          <p>
            The Company prohibits any form of retaliation against anyone who has raised a
            complaint of sexual harassment or has cooperated in any inquiry involving a complaint
            of sexual harassment. Any individual who believes that they are experiencing
            retaliation, by way of intimidation, pressure to withdraw the case or threats for
            reporting, testifying or otherwise participating in the proceedings, should report this
            to the Internal Committee or HR, and the Company will then address the concerns
            raised. Any person who is found to be guilty of retaliation may be subject to
            appropriate disciplinary action including dismissal from service. Anyone who abuses
            this procedure would also be subject to disciplinary action including dismissal from
            service.
          </p>
        </Section>

        <Section id="conclusion" title="XI. Conclusion">
          <p>
            In conclusion, the Company reiterates its commitment to providing its employees a
            workplace free from harassment/discrimination and where every employee is treated with
            dignity and respect.
          </p>
        </Section>

        {/* Filing a complaint */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
            <ShieldCheck size={22} className="text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold mb-1.5">To file a complaint</h3>
            <p className="text-sm text-text-2 leading-relaxed">
              Written complaints may be sent by letter, preferably within 15 days of the incident,
              addressed to the Presiding Officer of the Internal Committee, or by email to{' '}
              <a href={`mailto:${SITE.email}`} className="text-amber-400 hover:underline">
                {SITE.email}
              </a>{' '}
              marked to the attention of the Presiding Officer, Internal Committee.
            </p>
          </div>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border border-border rounded-lg hover:border-amber-500/50 hover:text-amber-400 transition-colors duration-200 shrink-0"
          >
            <Mail size={16} />
            Email the IC
          </a>
        </div>
      </div>
    </>
  );
}
