import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

def obtener_dato(mensaje, valor_predeterminado):
    entrada = input(mensaje)
    if entrada.lower() == "no":
        return valor_predeterminado
    try:
        valor = float(entrada)
        return valor
    except ValueError:
        print("Entrada no válida, usando valor predeterminado.")
        return valor_predeterminado

# Valores predeterminados
amplitud = obtener_dato("Introduce la amplitud (A) de la onda (o 'no' para usar el valor predeterminado 1): ", 1)
frecuencia = obtener_dato("Introduce la frecuencia en Hz (o 'no' para usar el valor predeterminado 1 Hz): ", 1)
longitud_onda = obtener_dato("Introduce la longitud de onda (λ) en metros (o 'no' para usar el valor predeterminado 1 m): ", 1)
longitud_de_la_cuerda = obtener_dato("Introduce la longitud de la cuerda (o 'no' para usar el valor predeterminado 1): ", 1)
n = int(obtener_dato("Introduce el valor de n que sea mayor a 0 y entero (se usará 1 si no se cumple): ", 1))

# Asegurar que n es un entero positivo
if n <= 0:
    n = 1

t = np.linspace(0, 2, 1000) 
x = np.linspace(0, longitud_de_la_cuerda, 1000)

# Cálculos para la onda estacionaria
numero_de_onda = n * np.pi / longitud_de_la_cuerda  
frecuencia_angular = 2 * np.pi * frecuencia  

onda_estacionaria = 2 * amplitud * np.sin(numero_de_onda * x[:, None]) * np.cos(frecuencia_angular * t)

# Configuración de la animación
fig, ax = plt.subplots(figsize=(10, 6))
line, = ax.plot(x, onda_estacionaria[:, 0], color='b')

ax.set_title("Onda Estacionaria en una Cuerda Vibrante")
ax.set_xlabel("Posición (x)")
ax.set_ylabel("Desplazamiento (ψ)")
ax.grid(True)
ax.set_xlim(0, longitud_de_la_cuerda)
ax.set_ylim(-2 * amplitud, 2 * amplitud)

# Función para actualizar la trama de la animación
def actualizar(i):
    line.set_ydata(onda_estacionaria[:, i])
    return line,

# Crear la animación
anim = FuncAnimation(fig, actualizar, frames=len(t), interval=20, blit=True)

# Mostrar la animación
plt.show()