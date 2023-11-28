import { shallowMount, mount } from '@vue/test-utils'
import { describe, expect, it} from "vitest"
import TableroRandom from '@/components/matches/TableroRandom.vue'

const verificaIndices = (rowIndexTest: number, colIndexTest: number, arrayIndex: IndexInfo[]): boolean => {

    var esValido: boolean = true

    if ( (rowIndexTest < 0 || rowIndexTest > 9) ||( colIndexTest < 0 || colIndexTest > 9)){
        esValido = false
    } else {
        for (const index of arrayIndex) {
            if (
                (index.colIndex === colIndexTest && index.rowIndex === rowIndexTest) ||
                ((index.colIndex === colIndexTest + 1 || index.colIndex === colIndexTest - 1) && index.rowIndex === rowIndexTest) ||
                (index.colIndex === colIndexTest && (index.rowIndex === rowIndexTest + 1 || index.rowIndex === rowIndexTest - 1)) ||
                ((index.colIndex === colIndexTest + 1 || index.colIndex === colIndexTest - 1) && (index.rowIndex === rowIndexTest + 1 || index.rowIndex === rowIndexTest - 1))
            ) {
                esValido = false;
                break;
            }
        }
    }

    return esValido

}

    interface IndexInfo {
        rowIndex: number;
        colIndex: number;
        direction: string;
        size: number;
    }

    describe ('TableroRandom', () => {
        const arrayIndex: IndexInfo[] = [
            {rowIndex: 4, colIndex: 4, direction: 'right', size: 1},
            {rowIndex: 4, colIndex: 5, direction: 'right', size: 1},
            {rowIndex: 4, colIndex: 6, direction: 'right', size: 1},
            {rowIndex: 4, colIndex: 7, direction: 'right', size: 1},
        ]

        it('Es col·loca peça a una celda ja ocupada', () => {

            const resultado = verificaIndices(4,4,arrayIndex)

            expect(resultado).toBe(false)

        })

        it('Es col·loca peça al costat de una celda ja ocupada', () => {

            const resultado = verificaIndices(5,4,arrayIndex)

            expect(resultado).toBe(false)

        })

        it('Es col·loca peça deixant al menys un quadrat lliure de distància', () => {

            const resultado = verificaIndices(6,4,arrayIndex)

            expect(resultado).toBe(true)

        })

        it('Es col·loca peça a una fila fora del tauler', () => {

            const resultado = verificaIndices(11,4,arrayIndex)

            expect(resultado).toBe(false)

        })

        it('Es col·loca peça a una columna fora del tauler', () => {

            const resultado = verificaIndices(4,11,arrayIndex)

            expect(resultado).toBe(false)

        })
    })

