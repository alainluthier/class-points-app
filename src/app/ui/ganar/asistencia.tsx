import { updateAttendace } from "@/app/lib/actions";
import { Attendance } from "@/app/lib/definitions";
import CheckStatus from "@/app/ui/ganar/status";
import { revalidatePath } from "next/cache";

export default async function Asistencia({ attendance, id_user }: { attendance: Attendance; id_user:number}) {
    const handleUpdate = async (data: FormData) => {
        "use server";
        const tipo = data.get("tipo");
        switch (tipo) {
            case "asistencia":
                if (attendance.asistencia > 0) {
                    attendance.asistencia = 0
                } else {
                    attendance.asistencia = 10
                }
                break;
            case "puntualidad":
                if (attendance.puntualidad > 0) {
                    attendance.puntualidad = 0
                } else {
                    attendance.puntualidad = 10
                }
                break;
            case "lectura":
                if (attendance.lectura > 0) {
                    attendance.lectura = 0
                } else {
                    attendance.lectura = 15
                }
                break;
            case "escrituras":
                if (attendance.escrituras > 0) {
                    attendance.escrituras = 0
                } else {
                    attendance.escrituras = 10
                }
                break;
            case "otro":
                if (attendance.otro > 0) {
                    attendance.otro = 0
                } else {
                    attendance.otro = 5
                }
                break;
        }
        updateAttendace(
            id_user,
            attendance.id_client,
            attendance.asistencia,
            attendance.puntualidad,
            attendance.escrituras,
            attendance.lectura,
            attendance.otro,
            attendance.estrella,
            attendance.fecha_numero);
        revalidatePath('/puntos/ganar');
    };
    return (
        <div className="flex items-center gap-2">
            <form action={handleUpdate}>
                <input name="tipo" className='hidden' defaultValue={'asistencia'} />
                <input name="status" className='hidden' defaultValue={attendance.asistencia > 0 ? 'no' : 'yes'} />
                <CheckStatus status={attendance.asistencia > 0 ? 'yes' : 'no'}
                    hidden={true}
                    texto='A' />
            </form>
            {/* attendance.asistencia > 0 ? true : */}
            <form action={handleUpdate}>
                <input name="tipo" className='hidden' defaultValue={'puntualidad'} />
                <input name="status" className='hidden' defaultValue={attendance.puntualidad > 0 ? 'no' : 'yes'} />
                <CheckStatus status={attendance.puntualidad > 0 ? 'yes' : 'no'}
                    hidden={true}
                    texto='P' />
            </form>
            <form action={handleUpdate}>
                <input name="tipo" className='hidden' defaultValue={'lectura'} />
                <input name="status" className='hidden' defaultValue={attendance.lectura > 0 ? 'no' : 'yes'} />
                <CheckStatus status={attendance.lectura > 0 ? 'yes' : 'no'}
                    hidden={true}
                    texto='L' />
            </form>
            <form action={handleUpdate}>
                <input name="tipo" className='hidden' defaultValue={'escrituras'} />
                <input name="status" className='hidden' defaultValue={attendance.escrituras > 0 ? 'no' : 'yes'} />
                <CheckStatus status={attendance.escrituras > 0 ? 'yes' : 'no'}
                    hidden={true}
                    texto='M' />
            </form>
            <form action={handleUpdate}>
                <input name="tipo" className='hidden' defaultValue={'otro'} />
                <input name="status" className='hidden' defaultValue={attendance.otro > 0 ? 'no' : 'yes'} />
                <CheckStatus status={attendance.otro > 0 ? 'yes' : 'no'}
                    hidden={true}
                    texto='E' />
            </form>
        </div>
    )
}