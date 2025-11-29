"use client"

import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface QueryDB {
  state: string
  model: string
  action: string
  result: any
  description: string
}

export const QueryDbView = ({ output }: { output: QueryDB }) => {
  const [filter, setFilter] = useState("")

  if (output.state !== "ready") {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <span>Executando consulta...</span>
      </div>
    )
  }

  const data = Array.isArray(output.result) ? output.result : []
  const columns = data.length > 0 ? Object.keys(data[0]) : []

  // Filtro simples (busca em qualquer coluna)
  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(filter.toLowerCase())
    )
  )

  return (
    <div className="flex flex-col bg-background h-screen">
      {/* Cabeçalho */}
      <div className="bg-muted p-6 border-b">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Consulta ao Banco de Dados</h2>
          <p className="text-sm text-gray-500">{output.description}</p>
        </div>

        <div className="flex flex-col gap-1 text-sm text-gray-700 mt-2">
          <p>
            <strong>Modelo:</strong> {output.model}
          </p>
          <p>
            <strong>Ação:</strong> {output.action}
          </p>
        </div>

        {/* Campo de filtro */}
        <div className="mt-4">
          <Input
            placeholder="Filtrar resultados..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full max-w-md"
          />
        </div>
      </div>

      {/* Área de resultado com scroll horizontal e vertical */}
      {/* Área de resultado com scroll vertical e horizontal */}
      <div className="flex-1 p-4 overflow-auto">
        {data.length === 0 ? (
          <p className="text-sm  text-center mt-10">
            Nenhum resultado encontrado.
          </p>
        ) : (
          <div className="relative border   overflow-hidden">
            {/* Scroll horizontal e vertical ativado manualmente */}
            <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
              <Table className="min-w-max border-collapse select-none">
                <TableHeader>
                  <TableRow className="sticky top-0 bg-muted/70 backdrop-blur-sm z-10">
                    {columns.map((col) => (
                      <TableHead
                        key={col}
                        className="font-semibold  whitespace-nowrap border-b "
                      >
                        {col}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="text-center  py-6"
                      >
                        Nenhum resultado corresponde ao filtro.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData.map((row, index) => (
                      <TableRow key={index} className="hover:bg-muted/40">
                        {columns.map((col) => (
                          <TableCell
                            key={col}
                            className="text-xs  max-w-[300px] truncate "
                          >
                            {row[col] === null || row[col] === undefined
                              ? "-"
                              : typeof row[col] === "object"
                                ? JSON.stringify(row[col])
                                : String(row[col])}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>


      {/* Legenda */}
      <div className="text-sm text-gray-600 p-3 flex justify-between items-center border-t">
        <span>
          <strong>{filteredData.length}</strong> registro(s) exibido(s)
        </span>
        <span className="text-gray-500 italic">
          Scroll horizontal e vertical ativados
        </span>
      </div>
    </div>
  )
}
