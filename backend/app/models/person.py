from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database import Base


class Person(Base):
    __tablename__ = "persons"

    person_id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True,
    )

    area_id: Mapped[int] = mapped_column(
        ForeignKey("areas.area_id"),
        nullable=False,
    )

    name: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    father_name: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    village: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    area = relationship(
        "Area",
        back_populates="persons",
    )

    punishments = relationship(
        "Punishment",
        back_populates="person",
    )