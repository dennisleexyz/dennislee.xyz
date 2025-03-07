import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <div>
          {Object.entries(links).map(([text, link], idx, arr) => (
            <>
              <a href={link}>{text}</a>
              {idx < arr.length - 1 && " | "}
            </>
          ))}
        </div>
        {i18n(cfg.locale).components.footer.createdWith}{" "}
        <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
