// Only the specific flags this site actually uses are imported here (each
// as a `?url` import, so Vite bundles just these ~29 SVG files rather than
// the entire flag-icons library's few hundred flags). All flags are from
// the `flag-icons` npm package (MIT licensed, github.com/lipis/flag-icons).
import ar from 'flag-icons/flags/4x3/ar.svg?url'
import br from 'flag-icons/flags/4x3/br.svg?url'
import ch from 'flag-icons/flags/4x3/ch.svg?url'
import cn from 'flag-icons/flags/4x3/cn.svg?url'
import cu from 'flag-icons/flags/4x3/cu.svg?url'
import de from 'flag-icons/flags/4x3/de.svg?url'
import eg from 'flag-icons/flags/4x3/eg.svg?url'
import et from 'flag-icons/flags/4x3/et.svg?url'
import fr from 'flag-icons/flags/4x3/fr.svg?url'
import gb from 'flag-icons/flags/4x3/gb.svg?url'
import gh from 'flag-icons/flags/4x3/gh.svg?url'
import gr from 'flag-icons/flags/4x3/gr.svg?url'
import ht from 'flag-icons/flags/4x3/ht.svg?url'
import il from 'flag-icons/flags/4x3/il.svg?url'
import inFlag from 'flag-icons/flags/4x3/in.svg?url'
import iq from 'flag-icons/flags/4x3/iq.svg?url'
import ir from 'flag-icons/flags/4x3/ir.svg?url'
import it from 'flag-icons/flags/4x3/it.svg?url'
import jp from 'flag-icons/flags/4x3/jp.svg?url'
import mn from 'flag-icons/flags/4x3/mn.svg?url'
import mx from 'flag-icons/flags/4x3/mx.svg?url'
import nl from 'flag-icons/flags/4x3/nl.svg?url'
import ru from 'flag-icons/flags/4x3/ru.svg?url'
import se from 'flag-icons/flags/4x3/se.svg?url'
import sg from 'flag-icons/flags/4x3/sg.svg?url'
import tr from 'flag-icons/flags/4x3/tr.svg?url'
import us from 'flag-icons/flags/4x3/us.svg?url'
import ve from 'flag-icons/flags/4x3/ve.svg?url'
import za from 'flag-icons/flags/4x3/za.svg?url'

export const FLAG_URLS: Record<string, string> = {
  ar, br, ch, cn, cu, de, eg, et, fr, gb, gh, gr, ht, il,
  in: inFlag,
  iq, ir, it, jp, mn, mx, nl, ru, se, sg, tr, us, ve, za,
}
